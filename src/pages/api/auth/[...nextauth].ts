import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection(
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(q.Index('user_by_email'), session?.user?.email),
                  ),
                ),
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ),
          ),
        );
        console.log(userActiveSubscription);
        return { ...session, activeSubscription: userActiveSubscription };
      } catch (error) {
        console.log('aaa', error);
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
    async signIn({ user }) {
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(email as string)),
              ),
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(
              q.Match(q.Index('user_by_email'), q.Casefold(email as string)),
            ),
          ),
        );

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
