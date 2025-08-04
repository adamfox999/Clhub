-- SQL function to atomically increment order counter
-- Run this in your Supabase SQL editor

CREATE OR REPLACE FUNCTION increment_order_counter()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  new_number INTEGER;
BEGIN
  -- Use UPDATE ... RETURNING to atomically increment and get the new value
  -- This prevents race conditions when multiple orders are submitted simultaneously
  UPDATE order_counter 
  SET current_number = current_number + 1 
  WHERE id = (SELECT id FROM order_counter LIMIT 1)
  RETURNING current_number INTO new_number;
  
  -- If no row was updated (table is empty), insert initial row
  IF new_number IS NULL THEN
    INSERT INTO order_counter (current_number) VALUES (1)
    RETURNING current_number INTO new_number;
  END IF;
  
  RETURN new_number;
END;
$$;
