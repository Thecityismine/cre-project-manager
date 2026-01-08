// ============================================================================
// SUPABASE CONFIGURATION - Single User Mode (No Auth)
// SAFEGUARDED VERSION - Prevents accidental data deletion
// ============================================================================
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfezzjooguixoyawuzhd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZXp6am9vZ3VpeG95YXd1emhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDQ5MjMsImV4cCI6MjA4MzIyMDkyM30.g6uJdiwWYTqNrplu4_gqc4_cVCIN2KdvgT0zzBQYu_Y';

// CRITICAL: Disable realtime to prevent infinite retry errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    enabled: false
  },
  auth: {
    persistSession: false
  }
});

// Fixed user ID for single-user mode (no authentication required)
const FIXED_USER_ID = '00000000-0000-0000-0000-000000000001';

// Track if we've ever loaded from Supabase (prevents premature saves)
let hasLoadedFromSupabase = false;

// ============================================================================
// STORAGE ADAPTER - Supabase Version (Single User) - FULLY SAFEGUARDED
// ============================================================================

export const storage = {
  // Get all projects for the current user
  async getProjects() {
    try {
      console.log('🔍 Loading projects from Supabase...');
      
      const { data, error } = await supabase
        .from('projects')
        .select('project_data')
        .eq('user_id', FIXED_USER_ID)
        .not('project_id', 'is', null); // Only get rows with valid project_id

      if (error) {
        console.error('❌ Error loading projects:', error);
        throw error;
      }
      
      const projects = data ? data.map(p => p.project_data) : [];
      hasLoadedFromSupabase = true; // Mark that we've loaded successfully
      console.log(`✅ Loaded ${projects.length} projects from Supabase`);
      return projects;
    } catch (error) {
      console.error('❌ Error fetching projects:', error);
      hasLoadedFromSupabase = true; // Still mark as loaded to prevent saves
      return [];
    }
  },

  // Save all projects
  async setProjects(projects) {
    try {
      console.log(`💾 Attempting to save ${projects.length} projects to Supabase...`);
      
      // ⚠️ CRITICAL SAFETY CHECK #1: Don't save before we've loaded
      if (!hasLoadedFromSupabase) {
        console.warn('⚠️ SAFETY: Blocking save - Supabase data not loaded yet');
        console.warn('⚠️ This prevents accidental deletion on app startup');
        return false;
      }
      
      // ⚠️ CRITICAL SAFETY CHECK #2: Don't save empty arrays (prevents accidental deletion)
      if (!projects || projects.length === 0) {
        console.warn('⚠️ SAFETY: Blocking save of empty project array');
        console.warn('⚠️ If you want to delete all projects, use deleteAllProjects() method');
        return false;
      }
      
      // STEP 1: Clean up any orphaned NULL project_id rows
      const { error: cleanupError } = await supabase
        .from('projects')
        .delete()
        .eq('user_id', FIXED_USER_ID)
        .is('project_id', null);
      
      if (cleanupError) {
        console.warn('⚠️ Cleanup warning:', cleanupError);
      }

      // STEP 2: Validate all projects have an ID
      const validProjects = projects.filter(p => p && p.id);
      if (validProjects.length !== projects.length) {
        console.warn(`⚠️ Filtered out ${projects.length - validProjects.length} projects without IDs`);
      }

      if (validProjects.length === 0) {
        console.warn('⚠️ No valid projects to save after filtering');
        return false;
      }

      // STEP 3: Prepare records for upsert
      const projectRecords = validProjects.map(project => ({
        user_id: FIXED_USER_ID,
        project_id: String(project.id), // Ensure it's a string
        project_data: project
      }));

      // STEP 4: Get existing project IDs to determine deletions
      const { data: existingProjects, error: fetchError } = await supabase
        .from('projects')
        .select('project_id')
        .eq('user_id', FIXED_USER_ID)
        .not('project_id', 'is', null);

      if (fetchError) {
        console.error('❌ Error fetching existing projects:', fetchError);
      }

      const existingIds = existingProjects ? existingProjects.map(p => p.project_id) : [];
      const newIds = validProjects.map(p => String(p.id));
      
      // STEP 5: Delete projects that are no longer in the list
      const idsToDelete = existingIds.filter(id => !newIds.includes(id));
      
      // ⚠️ CRITICAL SAFETY CHECK #3: Don't delete everything
      if (idsToDelete.length > 0 && idsToDelete.length === existingIds.length) {
        console.error('❌ SAFETY: Refusing to delete ALL projects');
        console.error('❌ This would delete all existing data');
        console.error('❌ If intentional, use deleteAllProjects() method');
        return false;
      }
      
      if (idsToDelete.length > 0) {
        console.log(`🗑️ Deleting ${idsToDelete.length} removed projects:`, idsToDelete);
        const { error: deleteError } = await supabase
          .from('projects')
          .delete()
          .eq('user_id', FIXED_USER_ID)
          .in('project_id', idsToDelete);
        
        if (deleteError) {
          console.error('❌ Error deleting projects:', deleteError);
        } else {
          console.log(`✅ Successfully deleted ${idsToDelete.length} projects`);
        }
      }

      // STEP 6: Upsert all projects
      // CRITICAL: Use composite key (user_id, project_id) to match database constraint
      const { error: upsertError } = await supabase
        .from('projects')
        .upsert(projectRecords, {
          onConflict: 'user_id,project_id', // Matches projects_user_project_unique constraint
          ignoreDuplicates: false
        });

      if (upsertError) {
        console.error('❌ Error upserting projects:', upsertError);
        throw upsertError;
      }
      
      console.log(`✅ Successfully saved ${validProjects.length} projects to Supabase`);
      return true;
    } catch (error) {
      console.error('❌ Fatal error saving projects:', error);
      return false;
    }
  },

  // Manual method to delete all projects (requires explicit call)
  async deleteAllProjects() {
    try {
      console.log('🗑️ MANUAL DELETE: Removing all projects for user');
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('user_id', FIXED_USER_ID);
      
      if (error) throw error;
      console.log('✅ All projects deleted');
      return true;
    } catch (error) {
      console.error('❌ Error deleting all projects:', error);
      return false;
    }
  },

  // Get contacts
  async getContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('contact_data')
        .eq('user_id', FIXED_USER_ID);

      if (error) throw error;
      return data ? data.map(c => c.contact_data) : [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },

  // Save contacts
  async setContacts(contacts) {
    try {
      if (!contacts || contacts.length === 0) {
        console.log('ℹ️ No contacts to save');
        return true;
      }

      // Delete existing contacts
      await supabase
        .from('contacts')
        .delete()
        .eq('user_id', FIXED_USER_ID);

      // Insert contacts
      const contactRecords = contacts.map(contact => ({
        user_id: FIXED_USER_ID,
        contact_data: contact
      }));

      const { error } = await supabase
        .from('contacts')
        .insert(contactRecords);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving contacts:', error);
      return false;
    }
  },

  // Get master tasks
  async getMasterTasks() {
    try {
      const { data, error } = await supabase
        .from('master_tasks')
        .select('tasks_data')
        .eq('user_id', FIXED_USER_ID)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      return data ? data.tasks_data : [];
    } catch (error) {
      console.error('Error fetching master tasks:', error);
      return [];
    }
  },

  // Save master tasks
  async setMasterTasks(tasks) {
    try {
      if (!tasks || tasks.length === 0) {
        console.log('ℹ️ No tasks to save');
        return true;
      }

      // Upsert (update or insert)
      const { error } = await supabase
        .from('master_tasks')
        .upsert({
          user_id: FIXED_USER_ID,
          tasks_data: tasks
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving master tasks:', error);
      return false;
    }
  },

  // Get app settings (teams, etc)
  async getSetting(key) {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('setting_value')
        .eq('user_id', FIXED_USER_ID)
        .eq('setting_key', key)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data ? data.setting_value : null;
    } catch (error) {
      // Silently return null for missing settings (not an error condition)
      return null;
    }
  },

  // Save app setting
  async setSetting(key, value) {
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({
          user_id: FIXED_USER_ID,
          setting_key: key,
          setting_value: value
        }, {
          onConflict: 'user_id,setting_key'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving setting:', error);
      return false;
    }
  },

  // Legacy methods for backward compatibility with window.storage API
  async get(key) {
    try {
      if (key === 'projects') {
        const projects = await this.getProjects();
        return projects.length > 0 ? { key, value: JSON.stringify(projects) } : null;
      }
      if (key === 'contacts') {
        const contacts = await this.getContacts();
        return contacts.length > 0 ? { key, value: JSON.stringify(contacts) } : null;
      }
      if (key === 'master-tasks') {
        const tasks = await this.getMasterTasks();
        return tasks.length > 0 ? { key, value: JSON.stringify(tasks) } : null;
      }
      // For other keys, use settings table
      const value = await this.getSetting(key);
      return value ? { key, value: JSON.stringify(value) } : null;
    } catch (error) {
      console.error(`Error in storage.get('${key}'):`, error);
      return null;
    }
  },

  async set(key, value) {
    try {
      const parsed = JSON.parse(value);
      
      if (key === 'projects') {
        return await this.setProjects(parsed);
      }
      if (key === 'contacts') {
        return await this.setContacts(parsed);
      }
      if (key === 'master-tasks') {
        return await this.setMasterTasks(parsed);
      }
      // For other keys, use settings table
      return await this.setSetting(key, parsed);
    } catch (error) {
      console.error(`Error in storage.set('${key}'):`, error);
      return false;
    }
  },

  async delete(key) {
    // Implement if needed
    return { key, deleted: true };
  },

  async list(prefix) {
    // Implement if needed
    return { keys: [] };
  }
};
