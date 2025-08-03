import { getNextOrderNumber } from '@/lib/orderNumber';
import { generateOrderToken } from '@/lib/uuid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_email, event_id, items, notes, requested_time } = req.body;
  if (!user_email || !items || !requested_time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate order number and token
    const order_number = await getNextOrderNumber();
    const manage_token = generateOrderToken();

    // Set cutoff time (1 hour before requested time)
    const cutoff_time = new Date(new Date(requested_time).getTime() - 60 * 60 * 1000).toISOString();

    // Insert order
    const { data, error } = await supabase.from('orders').insert([
      {
        order_number,
        user_email,
        event_id,
        items,
        total,
        notes,
        requested_time,
        manage_token,
        status: 'pending',
        cutoff_time
      }
    ]).select();
    if (error) throw error;

    // Respond with order details and manage link
    return res.status(201).json({
      order: data[0],
      manage_link: `/food/manage/${manage_token}`
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to create order' });
  }
}
