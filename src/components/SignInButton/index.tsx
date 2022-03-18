import React from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export default function SignInButton() {
  const { data, status } = useSession();
  const isUserLoggedIn = status === 'authenticated';

  return isUserLoggedIn ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      {data?.user?.name}
      <FiX className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
}
