import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
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
  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions);