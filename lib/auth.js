import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(email) {
  if (typeof email !== "string" || !email.trim()) return false;
  const normalized = email.trim().toLowerCase();
  return getAdminEmails().includes(normalized);
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-imma.session-token"
          : "imma.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.email = user.email ?? token.email;
        token.name = user.name ?? token.name;
        token.picture = user.image ?? token.picture;
      }

      if (token?.email) {
        token.isAdmin = isAdminEmail(token.email);
      }

      if (account?.provider === "google") {
        const googleId = account?.providerAccountId ?? null;
        const email = token?.email ?? user?.email ?? profile?.email ?? null;
        const name = token?.name ?? user?.name ?? profile?.name ?? null;
        const image = token?.picture ?? user?.image ?? profile?.picture ?? null;

        if (googleId && email) {
          try {
            await connectDB();
            const dbUser = await User.findOneAndUpdate(
              { googleId },
              { $set: { googleId, name, email, image } },
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            token.userId = dbUser?._id?.toString?.() ?? token.userId;
            token.googleId = googleId;
          } catch (error) {
            console.error("Failed to upsert user after sign-in:", error);
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (!session.user) session.user = {};

      if (token?.email) session.user.email = token.email;
      if (token?.name) session.user.name = token.name;
      if (token?.picture) session.user.image = token.picture;
      if (token?.userId) session.user.id = token.userId;
      if (token?.googleId) session.user.googleId = token.googleId;
      if (typeof token?.isAdmin === "boolean") session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
};
