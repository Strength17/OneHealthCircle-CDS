import supabase from '../services/supabase.js';

// CREATE POST
export const createPost = async (req, res) => {
  const { title, content, platforms } = req.body;

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, platforms, status: 'draft' }])
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
};

// GET POSTS
export const getPosts = async (req, res) => {
  const { data, error } = await supabase.from('posts').select('*');

  if (error) return res.status(500).json(error);

  res.json(data);
};

// PUBLISH POST
export const publishPost = async (req, res) => {
  const { id } = req.params;

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) return res.status(404).json({ error: 'Post not found' });

  const platforms = post.platforms || [];

  if (platforms.includes('facebook')) {
    console.log('Posting to Facebook...');
  }

  if (platforms.includes('linkedin')) {
    console.log('Posting to LinkedIn...');
  }

  if (platforms.includes('website')) {
    console.log('Publishing to website...');
  }

  await supabase
    .from('posts')
    .update({ status: 'published' })
    .eq('id', id);

  res.json({ message: 'Post published everywhere 🚀' });
};