import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "272774215340-460jbaj2930ef7boffjdl8aiqlrjf4eh.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});


