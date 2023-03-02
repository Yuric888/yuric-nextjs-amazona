import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
type UserType = {
  _id: string;
  email: string;
  password: string;
  is_Admin: boolean;
};
export default NextAuth({
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmmin) token.isAdmmin = user.isAdmmin;
      return token;
    },
    async session({ session, token }: any) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Email is not registered");
        }

        const isPasswordCorret = await compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorret) {
          throw new Error("Password is incorrect");
        } else {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin,
          };
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
});
