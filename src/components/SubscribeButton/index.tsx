import React from 'react';

import { signIn, useSession } from 'next-auth/react';

import { api } from '../../services/api';
import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  const session = useSession();

  const handleSubscribe = async () => {
    if (session.status === 'unauthenticated') {
      signIn('github');
      return null;
    }
    try {
      const response = await api.post('/subscribe', { priceId });
      const { sessionId } = response.data;
    } catch (error) {
      console.error(error);
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
