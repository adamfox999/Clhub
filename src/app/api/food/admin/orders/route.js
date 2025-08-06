import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Fetch orders from the correct table name - 'orders' not 'food_orders'
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Transform the data to match the expected format
    const transformedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.order_number?.toString() || 'N/A',
      order_number: order.order_number?.toString() || 'N/A',
      customer: order.user_email,
      user_email: order.user_email,
      total: parseFloat(order.total) || 0,
      status: order.status || 'pending',
      items: order.items || [],
      notes: order.notes || '',
      allergies: order.allergies || '',
      created_at: order.created_at,
      requested_time: order.requested_time,
      manage_token: order.manage_token,
      cutoff_time: order.cutoff_time,
      event_id: order.event_id
    }));

    return new Response(JSON.stringify(transformedOrders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
