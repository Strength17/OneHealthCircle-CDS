import { supabase, TABLE_NAME } from './supabase.js';

export const createPost = async (payload) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([payload])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error('Post not found');
  return data;
};

export const updatePost = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error('Update failed');
  return data;
};

export const deletePost = async (id) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) throw new Error('Delete failed');
};