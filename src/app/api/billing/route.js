import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import BoatSpace from '@/models/BoatSpace';
import Contact from '@/models/Contact';

export async function GET() {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await Contact.findById(session.user.id);
  if (!user) {
    return Response.json({ error: 'Contact not found' }, { status: 404 });
  }

  const billingId = user.isFamilyMember
    ? user.familyId || user._id.toString()
    : user._id.toString();

  const allContacts = await Contact.find({
    $or: [
      { _id: billingId },
      { familyId: billingId }
    ]
  });

  const contactIds = allContacts.map(c => c._id.toString());

  const spaces = await BoatSpace.find({
    billingContact: { $in: contactIds }
  });

  const totalSpaces = spaces.length;
  const freeSpaces = 1;
  const paidSpaces = Math.max(0, totalSpaces - freeSpaces);
  const totalDue = paidSpaces * 30;

  return Response.json({
    billingId,
    contactIds,
    totalSpaces,
    paidSpaces,
    totalDue
  });
}
