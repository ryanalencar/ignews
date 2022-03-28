import React from 'react';

import { signIn, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  const session = useSession();

  const handleSubscribe = () => {
    if (session.status === 'unauthenticated') {
      signIn('github');
      return null;
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
