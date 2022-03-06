import React from 'react';

import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
