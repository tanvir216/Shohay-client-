import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const mongodbUri = process.env.MONGODB_URI;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!mongodbUri) {
  throw new Error("MONGODB_URI is missing from environment variables");
}

if (!googleClientId || !googleClientSecret) {
  throw new Error("Google OAuth environment variables are missing");
}

const client = new MongoClient(mongodbUri);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(client.db(), { client }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },

  plugins: [jwt(), nextCookies()],
});
