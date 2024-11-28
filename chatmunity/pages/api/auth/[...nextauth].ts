import { connectDB } from "@/app/utils/datadbase";
import { UserData } from "@/types";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      const client = await connectDB;
      const db = client.db('Chatmunity');

      const userData = await db.collection<UserData>('user').findOne({ email: user.email as string });
      
      if (!userData) {
        await db.collection<UserData>('user').insertOne({
          _id: user?.id as string,
          name: user?.name as string,
          image: user?.image as string,
          email: user?.email as string,
          created_at: (new Date()).toString(),
          status: 'offline',
          id: user?.email as string,
        });
      }

      return true;
    },
  },
  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions);