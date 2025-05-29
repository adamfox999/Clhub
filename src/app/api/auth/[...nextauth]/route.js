import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { adapter } from '@/lib/adapter';
import Contact from '@/models/Contact';
import { connectToDB } from '@/lib/mongodb'; // ✅ required for Contact lookups via Mongoose

export const authOptions = {
  adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ user }) {
      await connectToDB(); // ✅ ensure Mongoose is connected

      const existingContact = await Contact.findOne({ email: user.email });

      if (!existingContact) {
        await Contact.create({
          name: user.name || 'New User',
          email: user.email,
          role: 'member',
          createdAt: new Date()
        });
      }

      return true;
    },
    async session({ session }) {
      await connectToDB(); // ✅ ensure Mongoose is connected

      const dbContact = await Contact.findOne({ email: session.user.email });

      if (dbContact) {
        session.user.id = dbContact._id;
        session.user.role = dbContact.role;
      }

      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;
