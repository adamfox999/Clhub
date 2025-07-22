import { createServerClient } from '@supabase/ssr';
import { connectToDB } from '@/lib/mongodb';
import BoatSpace from '@/models/BoatSpace';
import Contact from '@/models/Contact';

export async function GET() {
  await connectToDB();


  // Supabase Auth: get user from access token (example, adjust as needed)
  const req = { headers: {} };
  const res = { getHeader() {}, setHeader() {} };
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { req, res });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }


  // TODO: Map Supabase user to Contact if needed
  const dbUser = await Contact.findOne({ email: user.email });
  if (!dbUser) {
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
