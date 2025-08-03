// Secure UUID token generation
import { v4 as uuidv4 } from 'uuid';

export function generateOrderToken() {
  return uuidv4();
}

export function validateOrderToken(order, token) {
  return order.manage_token === token;
}
