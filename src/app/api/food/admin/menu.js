import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all menu items
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ items: data });
  }
  if (req.method === 'POST') {
    // Add new menu item
    const { name, description, category, price, image, customisations, available } = req.body;
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
      return res.status(500).json({ error: insertError.message });
    }
    return res.status(201).json({ item: insertData[0] });
  }
  if (req.method === 'PUT') {
    // Edit existing menu item
    const { id, name, description, category, price, image, customisations, available } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing menu item id' });
    const customisationsArr = customisations
      ? customisations.split(',').map(s => {
          const [n, p] = s.split(':').map(x => x.trim());
          return n ? { name: n, price: p ? Number(p) : 0 } : null;
        }).filter(Boolean)
      : [];
    const updatedItem = {
      name,
      description,
      category,
      price,
      image_url: image,
      always_available: available,
      customisations: customisationsArr,
    };
    const { error: updateError, data: updateData } = await supabase
      .from('menu_items')
      .update(updatedItem)
      .eq('id', id)
      .select();
    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }
    return res.status(200).json({ item: updateData[0] });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
