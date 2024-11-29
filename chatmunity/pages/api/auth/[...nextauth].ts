import { connectDB } from "@/app/utils/datadbase";
import { UserData } from "@/types";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize (credentials) {
        const client = await connectDB;
        const db = client.db('Chatmunity');

        const user = await db.collection<UserData>('user').findOne({ email: credentials?.email as string });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password as string);

        if (!isPasswordValid) {
          console.log('비밀번호가 일치하지 않습니다.');
          return null;
        }

        return user;
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    newUser: '/user/signup',
    signIn: '/user/signin',
  },
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