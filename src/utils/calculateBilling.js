import Contact from '@/models/Contact';
import BoatSpace from '@/models/BoatSpace';
import { connectToDB } from '@/lib/mongodb';

export async function calculateBilling() {
  await connectToDB();

  const contacts = await Contact.find();
  const boatSpaces = await BoatSpace.find();

  const billingMap = new Map();

  for (const contact of contacts) {
    const billingId = contact.isFamilyMember
      ? contact.familyId || contact._id.toString()
      : contact._id.toString();

    if (!billingMap.has(billingId)) {
      billingMap.set(billingId, []);
    }
    billingMap.get(billingId).push(contact._id.toString());
  }

  const billingSummary = [];

  for (const [billingId, contactIds] of billingMap.entries()) {
    const spaces = boatSpaces.filter(space =>
      contactIds.includes(space.billingContact?.toString())
    );

    const totalSpaces = spaces.length;
    const freeSpaces = 1;
    const paidSpaces = Math.max(0, totalSpaces - freeSpaces);
    const totalDue = paidSpaces * 30;

    billingSummary.push({
      billingId,
      contactIds,
      totalSpaces,
      paidSpaces,
      totalDue
    });
  }

  return billingSummary;
}
