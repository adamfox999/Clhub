import { createClient } from '@supabase/supabase-js';
import FoodPageClient from './FoodPageClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Server component that fetches data and passes to client component
export default async function FoodPage() {
  // Fetch categories and menu items on the server
  let categories = [];
  let menu = [];

  try {
    // Fetch categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('food_categories')
      .select('*')
      .order('order', { ascending: true });
    
    if (!categoriesError) {
      categories = categoriesData || [];
    }

    // Fetch menu items
    const { data: menuData, error: menuError } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!menuError) {
      menu = menuData || [];
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
    // Fallback to empty arrays if there's an error
  }

  // Pass the fetched data to the client component
  return <FoodPageClient initialCategories={categories} initialMenu={menu} />;
}
