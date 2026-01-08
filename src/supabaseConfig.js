// ============================================================================
// SUPABASE CONFIGURATION - Single User Mode (No Auth)
// ============================================================================
import { createClient } from '@supabase/supabase-js';

// ✅ RECOMMENDED: Use Vercel env vars
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

/*
// If you insist on hardcoding (not recommended), uncomment these and delete the env version above:
const supabaseUrl = 'https://pfezzjooguixoyawuzhd.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY';
*/

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail loudly, otherwise you get a white screen and mystery bugs.
  throw new Error(
    'Missing Supabase env vars. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in Vercel.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: { enabled: false },
});

// Fixed user ID for single-user mode (no authentication required)
const FIXED_USER_ID = '00000000-0000-0000-0000-000000000001';

// ============================================================================
// STORAGE ADAPTER (Single User)
// - window.storage.get(key) -> string | null
// - window.storage.set(key, string) -> boolean
// ============================================================================
export const storage = {
  // -------------------------
  // Projects
  // -------------------------
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('project_data')
        .eq('user_id', FIXED_USER_ID);

      if (error) throw error;
      return (data || []).map((row) => row.project_data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      return [];
    }
  },

  async setProjects(projects) {
    try {
      // Keep only projects with an id
      const validProjects = (projects || []).filter((p) => p && p.id);
      if (validProjects.length !== (projects || []).length) {
        console.warn(
          'Some projects missing id, skipped:',
          (projects || []).length - validProjects.length
        );
      }

      // Upsert all current projects
      const projectRecords = validProjects.map((project) => ({
        user_id: FIXED_USER_ID,
        project_id: String(project.id),
        project_data: project,
      }));

      if (projectRecords.length > 0) {
        const { error: upsertError } = await supabase
          .from('projects')
          .upsert(projectRecords, {
            onConflict: 'user_id,project_id',
            ignoreDuplicates: false,
          });

        if (upsertError) throw upsertError;
      }

      // Optional: delete rows that are no longer present
      // This is safe because it happens AFTER upsert, not before.
      const { data: existing, error: readError } = await supabase
        .from('projects')
        .select('project_id')
        .eq('user_id', FIXED_USER_ID);

      if (readError) throw readError;

      const existingIds = (existing || []).map((r) => String(r.project_id));
      const newIds = validProjects.map((p) => String(p.id));
      const idsToDelete = existingIds.filter((id) => !newIds.includes(id));

      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('projects')
          .delete()
          .eq('user_id', FIXED_USER_ID)
          .in('project_id', idsToDelete);

        if (deleteError) throw deleteError;
      }

      console.log(`✅ Saved ${validProjects.length} projects`);
      return true;
    } catch (err) {
      console.error('❌ Error saving projects:', err);
      return false;
    }
  },

  // -------------------------
  // Contacts (stored as one JSON blob row to avoid delete/insert issues)
  // Table: contacts_kv (user_id PK, contacts_data jsonb)
  // -------------------------
  async getContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts_kv')
        .select('contacts_data')
        .eq('user_id', FIXED_USER_ID)
        .maybeSingle();

      if (error) throw error;
      return data?.contacts_data || [];
    } catch (err) {
      console.error('Error fetching contacts:', err);
      return [];
    }
  },

  async setContacts(contacts) {
    try {
      const { error } = await supabase
        .from('contacts_kv')
        .upsert(
          {
            user_id: FIXED_USER_ID,
            contacts_data: contacts || [],
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error saving contacts:', err);
      return false;
    }
  },

  // -------------------------
  // Master Tasks (stored as one JSON blob row)
  // Table: master_tasks (user_id PK, tasks_data jsonb)
  // -------------------------
  async getMasterTasks() {
    try {
      const { data, error } = await supabase
        .from('master_tasks')
        .select('tasks_data')
        .eq('user_id', FIXED_USER_ID)
        .maybeSingle();

      if (error) throw error;
      return data?.tasks_data || [];
    } catch (err) {
      console.error('Error fetching master tasks:', err);
      return [];
    }
  },

  async setMasterTasks(tasks) {
    try {
      const { error } = await supabase
        .from('master_tasks')
        .upsert(
          {
            user_id: FIXED_USER_ID,
            tasks_data: tasks || [],
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error saving master tasks:', err);
      return false;
    }
  },

  // -------------------------
  // App settings (one row per setting key)
  // Table: app_settings (user_id + setting_key unique)
  // -------------------------
  async getSetting(key) {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('setting_value')
        .eq('user_id', FIXED_USER_ID)
        .eq('setting_key', key)
        .maybeSingle();

      if (error) throw error;
      return data?.setting_value ?? null;
    } catch (err) {
      console.error('Error fetching setting:', err);
      return null;
    }
  },

  async setSetting(key, value) {
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert(
          {
            user_id: FIXED_USER_ID,
            setting_key: key,
            setting_value: value,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,setting_key' }
        );

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error saving setting:', err);
      return false;
    }
  },

  // -------------------------
  // Compatibility: window.storage API
  // -------------------------
  async get(key) {
    if (key === 'projects') {
      const projects = await this.getProjects();
      return projects.length ? JSON.stringify(projects) : null;
    }
    if (key === 'contacts') {
      const contacts = await this.getContacts();
      return contacts.length ? JSON.stringify(contacts) : null;
    }
    if (key === 'master-tasks') {
      const tasks = await this.getMasterTasks();
      return tasks.length ? JSON.stringify(tasks) : null;
    }

    const setting = await this.getSetting(key);
    return setting != null ? JSON.stringify(setting) : null;
  },

  async set(key, value) {
    let parsed;
    try {
      parsed = typeof value === 'string' ? JSON.parse(value) : value;
    } catch (e) {
      console.error(`[storage.set] JSON parse failed for key="${key}"`, e);
      return false;
    }

    if (key === 'projects') return await this.setProjects(parsed);
    if (key === 'contacts') return await this.setContacts(parsed);
    if (key === 'master-tasks') return await this.setMasterTasks(parsed);

    return await this.setSetting(key, parsed);
  },

  async remove(key) {
    // Optional: implement if you need it
    // For now, treat remove as clearing the value.
    if (key === 'projects') return await this.setProjects([]);
    if (key === 'contacts') return await this.setContacts([]);
    if (key === 'master-tasks') return await this.setMasterTasks([]);
    return await this.setSetting(key, null);
  },
};
