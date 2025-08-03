import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ items: data }), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { name, description, category, price, image, customisations, available } = body;
  const customisationsArr = customisations
    ? customisations.split(',').map(s => {
        const [n, p] = s.split(':').map(x => x.trim());
        return n ? { name: n, price: p ? Number(p) : 0 } : null;
      }).filter(Boolean)
    : [];
  const newItem = {
    name,
    description,
    category,
    price,
    image_url: image,
    always_available: available,
    customisations: customisationsArr,
  };
  const { error: insertError, data: insertData } = await supabase
    .from('menu_items')
    .insert([newItem])
    .select();
  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ item: insertData[0] }), { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, order } = body;
  if (!id) return new Response(JSON.stringify({ error: 'Missing menu item id' }), { status: 400 });
  // If only order is provided, update just the order field
  if (order !== undefined) {
    const { error, data } = await supabase
      .from('menu_items')
      .update({ order })
      .eq('id', id)
      .select();
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ item: data[0] }), { status: 200 });
  }
  // ...existing code for full item update (optional)...
}
