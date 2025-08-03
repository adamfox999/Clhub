// Cutoff time logic
export function isBeforeCutoff(order) {
  if (!order.cutoff_time) return true;
  return new Date() < new Date(order.cutoff_time);
}
