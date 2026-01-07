// ============================================================================
// SUPABASE CONFIGURATION - Single User Mode (No Auth)
// ============================================================================
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfezzjooguixoyawuzhd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZXp6am9vZ3VpeG95YXd1emhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDQ5MjMsImV4cCI6MjA4MzIyMDkyM30.g6uJdiwWYTqNrplu4_gqc4_cVCIN2KdvgT0zzBQYu_Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fixed user ID for single-user mode (no authentication required)
// This is a placeholder - will be replaced with your actual user ID after first signup
const FIXED_USER_ID = '00000000-0000-0000-0000-000000000001';

// ============================================================================
// STORAGE ADAPTER - Supabase Version (Single User)
// ============================================================================
// This adapter replaces localStorage with Supabase database calls
// No authentication required - uses a fixed user ID

export const storage = {
  // Get all projects for the current user
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('project_data')
        .eq('user_id', FIXED_USER_ID);

      if (error) throw error;
      return data ? data.map(p => p.project_data) : [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  // Save all projects
  async setProjects(projects) {
    try {
      // Delete all existing projects
      await supabase
        .from('projects')
        .delete()
        .eq('user_id', FIXED_USER_ID);

      // Insert all projects
      const projectRecords = projects.map(project => ({
        user_id: FIXED_USER_ID,
        project_data: project
      }));

      const { error } = await supabase
        .from('projects')
        .insert(projectRecords);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving projects:', error);
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
      console.error('Error fetching setting:', error);
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
  },

  async set(key, value) {
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
