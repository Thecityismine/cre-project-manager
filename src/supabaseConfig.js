// ============================================================================
// SUPABASE CONFIGURATION - WITH DELETION SYNC
// ============================================================================
// This version properly syncs deletions by comparing state with database
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://loibzcnjvlfyfpnqhdwk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvaWJ6Y25qdmxmeWZwbnFoZHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMDU4NzMsImV4cCI6MjA4MzU4MTg3M30.QU99pO6zzXp8ZDPO8D7L9gUj0cPfqQVTOS-j0P_75DE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper to convert snake_case to camelCase
const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

// Helper to convert camelCase to snake_case
const toSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      result[snakeKey] = toSnakeCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

export const storage = {
  get: async (key) => {
    try {
      console.log(`[Supabase] Getting: ${key}`);
      
      switch (key) {
        case 'projects': {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          return { value: JSON.stringify(toCamelCase(data || [])) };
        }
        
        case 'master-tasks': {
          const { data, error } = await supabase
            .from('master_tasks')
            .select('*')
            .order('created_at', { ascending: true });
          
          if (error) throw error;
          return { value: JSON.stringify(toCamelCase(data || [])) };
        }
        
        case 'contacts': {
          const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('name', { ascending: true });
          
          if (error) throw error;
          return { value: JSON.stringify(toCamelCase(data || [])) };
        }
        
        case 'performance-reviews': {
          const { data, error } = await supabase
            .from('performance_reviews')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          return { value: JSON.stringify(toCamelCase(data || [])) };
        }
        
        case 'custom-teams': {
          const { data, error } = await supabase
            .from('custom_teams')
            .select('name')
            .order('name', { ascending: true });
          
          if (error) throw error;
          return { value: JSON.stringify((data || []).map(t => t.name)) };
        }
        
        case 'custom-subdivisions': {
          const { data, error } = await supabase
            .from('custom_subdivisions')
            .select('name')
            .order('name', { ascending: true });
          
          if (error) throw error;
          return { value: JSON.stringify((data || []).map(s => s.name)) };
        }
        
        case 'custom-project-types': {
          const { data, error } = await supabase
            .from('custom_project_types')
            .select('name')
            .order('name', { ascending: true });
          
          if (error) throw error;
          return { value: JSON.stringify((data || []).map(p => p.name)) };
        }
        
        default:
          console.warn(`[Supabase] Unknown key: ${key}`);
          return null;
      }
    } catch (error) {
      console.error(`[Supabase] Error getting ${key}:`, error);
      return null;
    }
  },

  set: async (key, value) => {
    try {
      console.log(`[Supabase] Setting: ${key}`);
      const data = JSON.parse(value);
      const now = new Date().toISOString();
      
      switch (key) {
        case 'projects': {
          // Non-destructive, optimistic-concurrency updates to avoid stale overwrites
          if (data.length > 0) {
            const { data: existingProjects, error: fetchError } = await supabase
              .from('projects')
              .select('id, updated_at');

            if (fetchError) throw fetchError;

            const existingMap = new Map(
              (existingProjects || []).map((p) => [p.id, p.updated_at])
            );

            for (const item of data) {
              const hasExisting = existingMap.has(item.id);
              const existingUpdatedAt = hasExisting ? existingMap.get(item.id) : null;
              const localUpdatedAt = item.updatedAt || item.updated_at || existingUpdatedAt;
              const formatted = {
                ...toSnakeCase(item),
                updated_at: now
              };

              if (hasExisting) {
                if (localUpdatedAt && existingUpdatedAt && new Date(localUpdatedAt) < new Date(existingUpdatedAt)) {
                  console.warn(
                    `[Supabase] Skipping stale project update for ${item.id}`
                  );
                  continue;
                }

                let updateQuery = supabase
                  .from('projects')
                  .update(formatted)
                  .eq('id', item.id);

                if (existingUpdatedAt === null) {
                  updateQuery = updateQuery.is('updated_at', null);
                } else {
                  updateQuery = updateQuery.eq('updated_at', existingUpdatedAt);
                }

                const { error: updateError } = await updateQuery;
                if (updateError) throw updateError;
              } else {
                const { error: insertError } = await supabase
                  .from('projects')
                  .insert(formatted);

                if (insertError) throw insertError;
              }
            }
          }
          break;
        }
        
        case 'master-tasks': {
          // Same pattern for master tasks
          const { data: existingTasks, error: fetchError } = await supabase
            .from('master_tasks')
            .select('id');
          
          if (fetchError) throw fetchError;
          
          const existingIds = new Set((existingTasks || []).map(t => t.id));
          const newIds = new Set(data.map(t => t.id));
          const idsToDelete = [...existingIds].filter(id => !newIds.has(id));
          
          if (idsToDelete.length > 0) {
            console.log(`[Supabase] Deleting ${idsToDelete.length} removed tasks`);
            const { error: deleteError } = await supabase
              .from('master_tasks')
              .delete()
              .in('id', idsToDelete);
            
            if (deleteError) throw deleteError;
          }
          
          if (data.length > 0) {
            const formatted = data.map(item => ({
              ...toSnakeCase(item),
              updated_at: now
            }));
            
            // Insert in batches
            for (let i = 0; i < formatted.length; i += 100) {
              const batch = formatted.slice(i, i + 100);
              const { error: upsertError } = await supabase
                .from('master_tasks')
                .upsert(batch, { 
                  onConflict: 'id',
                  ignoreDuplicates: false
                });
              
              if (upsertError) throw upsertError;
            }
          }
          break;
        }
        
        case 'contacts': {
          // Same pattern for contacts
          const { data: existingContacts, error: fetchError } = await supabase
            .from('contacts')
            .select('id');
          
          if (fetchError) throw fetchError;
          
          const existingIds = new Set((existingContacts || []).map(c => c.id));
          const newIds = new Set(data.map(c => c.id));
          const idsToDelete = [...existingIds].filter(id => !newIds.has(id));
          
          if (idsToDelete.length > 0) {
            console.log(`[Supabase] Deleting ${idsToDelete.length} removed contacts`);
            const { error: deleteError } = await supabase
              .from('contacts')
              .delete()
              .in('id', idsToDelete);
            
            if (deleteError) throw deleteError;
          }
          
          if (data.length > 0) {
            const formatted = data.map(item => ({
              ...toSnakeCase(item),
              updated_at: now
            }));
            
            const { error: upsertError } = await supabase
              .from('contacts')
              .upsert(formatted, { 
                onConflict: 'id',
                ignoreDuplicates: false
              });
            
            if (upsertError) throw upsertError;
          }
          break;
        }
        
        case 'performance-reviews': {
          const { data: existingReviews, error: fetchError } = await supabase
            .from('performance_reviews')
            .select('id');
          
          if (fetchError) throw fetchError;
          
          const existingIds = new Set((existingReviews || []).map(r => r.id));
          const newIds = new Set(data.map(r => r.id));
          const idsToDelete = [...existingIds].filter(id => !newIds.has(id));
          
          if (idsToDelete.length > 0) {
            console.log(`[Supabase] Deleting ${idsToDelete.length} removed reviews`);
            const { error: deleteError } = await supabase
              .from('performance_reviews')
              .delete()
              .in('id', idsToDelete);
            
            if (deleteError) throw deleteError;
          }
          
          if (data.length > 0) {
            const formatted = data.map(item => ({
              ...toSnakeCase(item),
              updated_at: now
            }));
            
            const { error: upsertError } = await supabase
              .from('performance_reviews')
              .upsert(formatted, { 
                onConflict: 'id',
                ignoreDuplicates: false
              });
            
            if (upsertError) throw upsertError;
          }
          break;
        }
        
        case 'custom-teams': {
          // For custom lists, we do full replace (they're small)
          const { data: existing } = await supabase
            .from('custom_teams')
            .select('name');
          
          const existingNames = new Set((existing || []).map(t => t.name));
          const newNames = new Set(data);
          const namesToDelete = [...existingNames].filter(name => !newNames.has(name));
          
          if (namesToDelete.length > 0) {
            await supabase.from('custom_teams').delete().in('name', namesToDelete);
          }
          
          if (data && data.length > 0) {
            const teams = data.map(name => ({ name, created_at: now }));
            await supabase.from('custom_teams').upsert(teams, { onConflict: 'name' });
          }
          break;
        }
        
        case 'custom-subdivisions': {
          const { data: existing } = await supabase
            .from('custom_subdivisions')
            .select('name');
          
          const existingNames = new Set((existing || []).map(s => s.name));
          const newNames = new Set(data);
          const namesToDelete = [...existingNames].filter(name => !newNames.has(name));
          
          if (namesToDelete.length > 0) {
            await supabase.from('custom_subdivisions').delete().in('name', namesToDelete);
          }
          
          if (data && data.length > 0) {
            const subdivisions = data.map(name => ({ name, created_at: now }));
            await supabase.from('custom_subdivisions').upsert(subdivisions, { onConflict: 'name' });
          }
          break;
        }
        
        case 'custom-project-types': {
          const { data: existing } = await supabase
            .from('custom_project_types')
            .select('name');
          
          const existingNames = new Set((existing || []).map(p => p.name));
          const newNames = new Set(data);
          const namesToDelete = [...existingNames].filter(name => !newNames.has(name));
          
          if (namesToDelete.length > 0) {
            await supabase.from('custom_project_types').delete().in('name', namesToDelete);
          }
          
          if (data && data.length > 0) {
            const types = data.map(name => ({ name, created_at: now }));
            await supabase.from('custom_project_types').upsert(types, { onConflict: 'name' });
          }
          break;
        }
        
        default:
          console.warn(`[Supabase] Unknown key for set: ${key}`);
      }
      
      console.log(`[Supabase] Successfully saved ${key}`);
      return { key, value };
    } catch (error) {
      console.error(`[Supabase] Error setting ${key}:`, error);
      throw error;
    }
  }
};

export { supabase };
export default storage;

// Expose globally for debugging
if (typeof window !== 'undefined') {
  window.supabase = supabase;
  console.log('✅ Supabase client available as window.supabase');
}
