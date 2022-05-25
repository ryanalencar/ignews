import React from 'react';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  const session = useSession();
  const router = useRouter();

  const handleSubscribe = async () => {
    if (session.status === 'unauthenticated') {
      signIn('github');
      return null;
    }
    if (session?.data?.activeSubscription) {
      router.push('/posts');
      return;
    }
    try {
      const response = await api.post('/subscribe', { priceId });

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
