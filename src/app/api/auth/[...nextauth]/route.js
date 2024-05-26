import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Company from "@/models/Company";
import Admin from "@/models/Admin";
import connectDb from "@/utils/dbConnection";

export const authOptions = {
  pages: {
    signIn: "/companylogin",
    signIn: "/adminlogin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "company-credentials",
      name: "CompanyCredentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
        try {
          const user = await Company.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return {
                id: user.id,
                email: user.email,
                role: 'company',
                username: user.username,
              };
            }
          }
          return null;
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    CredentialsProvider({
      id: "admin-credentials",
      name: "AdminCredentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
        try {
          const user = await Admin.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return {
                id: user.id,
                email: user.email,
                role: 'admin',
                username: user.username,
              };
            }
          }
          return null;
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };