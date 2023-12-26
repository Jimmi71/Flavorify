import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utlis/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

const signInwithOuth = async ({ account, profile }) => {
  try {
    await connectToDB();
    const user = await User.findOne({
      email: profile.email,
    });
    if (user && user.provider === "google") {
      return true;
    } else if (!user) {
      const newUser = await User.create({
        username: profile.name.replace(" ", "").toLowerCase(),
        email: profile.email,
        provider: account.provider,
      });
      await newUser.save();
      return true;
    }
    throw new Error("Already Registered");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const signInWithCredentails = async ({ credentials }) => {
  await connectToDB();

  const user = await User.findOne({
    email: credentials.email,
  });
  if (user && user.provider === "google") {
    throw new Error("Email Registered by other Provider");
  } else if (!user) {
    throw new Error("User Not Registered");
  }

  const matchPassword = await bcrypt.compare(
    credentials.password,
    user?.hashedPassword
  );

  if (!matchPassword) {
    throw new Error("Password Incorrect");
  } else if (!user.isVerified) {
    throw new Error("User not Verified");
  }
  return user;
};

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        return await signInWithCredentails({ credentials });
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user = sessionUser;
      return session;
    },
    async signIn({ profile, account, credentials }) {
      if (account.type === "oauth") {
        return await signInwithOuth({ account, profile });
      } else if (account.type === "credentials") {
        return await signInWithCredentails({ credentials });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
