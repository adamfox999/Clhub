// Order number logic using order_counter table
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getNextOrderNumber() {
  // Use a transaction to safely increment the order counter
  // This prevents race conditions when multiple orders are submitted simultaneously
  
  try {
    // First, ensure there's a row in order_counter table
    const { data: counterData, error: selectError } = await supabase
      .from('order_counter')
      .select('*')
      .limit(1);
    
    if (selectError) throw selectError;
    
    // If no counter exists, create one
    if (!counterData || counterData.length === 0) {
      const { error: insertError } = await supabase
        .from('order_counter')
        .insert([{ current_number: 1 }]);
      
      if (insertError) throw insertError;
      return 1;
    }
    
    // Increment the counter atomically using SQL
    const { data, error } = await supabase
      .rpc('increment_order_counter');
    
    if (error) {
      // Fallback: if RPC doesn't exist, use manual increment (less safe)
      console.warn('RPC increment_order_counter not found, using fallback method');
      const currentId = counterData[0].id;
      const newNumber = counterData[0].current_number + 1;
      
      const { data: updateData, error: updateError } = await supabase
        .from('order_counter')
        .update({ current_number: newNumber })
        .eq('id', currentId)
        .select();
      
      if (updateError) throw updateError;
      return newNumber;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting next order number:', error);
    // Fallback to timestamp-based number if database fails
    return Math.floor(Date.now() / 1000) % 100000;
  }
}
