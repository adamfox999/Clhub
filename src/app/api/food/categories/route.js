import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data, error } = await supabase
    .from('food_categories')
    .select('*')
    .order('order', { ascending: true });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ categories: data }), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { name, order } = body;
  const { error, data } = await supabase
    .from('food_categories')
    .insert([{ name, order }])
    .select();
  if (error) {
    console.error('POST /api/food/categories error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ category: data[0] }), { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, name, order } = body;
  if (!id) return new Response(JSON.stringify({ error: 'Missing category id' }), { status: 400 });
  const { error, data } = await supabase
    .from('food_categories')
    .update({ name, order })
    .eq('id', id)
    .select();
  if (error) {
    console.error('PUT /api/food/categories error:', error, { id, name, order });
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ category: data[0] }), { status: 200 });
}