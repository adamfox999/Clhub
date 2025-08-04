import { getNextOrderNumber } from '@/lib/orderNumber';
import { generateOrderToken } from '@/lib/uuid';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_email, event_id, items, notes, allergies, requested_time } = body;
    
    if (!user_email || !items || !requested_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate total including customizations
    const total = items.reduce((sum, item) => {
      const basePrice = item.price * item.quantity;
      const customizationPrice = (item.customisations || []).reduce((customSum, custom) => {
        return customSum + (custom.price || 0);
      }, 0);
      return sum + basePrice + customizationPrice;
    }, 0);

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
        allergies,
        requested_time,
        manage_token,
        status: 'pending',
        cutoff_time
      }
    ]).select();
    
    if (error) throw error;

    // Respond with order details and manage link
    return NextResponse.json({
      order: data[0],
      manage_link: `/food/manage/${manage_token}`
    }, { status: 201 });
    
  } catch (err) {
    console.error('Order creation error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create order' }, { status: 500 });
  }
}
