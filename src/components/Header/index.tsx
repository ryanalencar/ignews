import React from 'react';

import Link from 'next/link';

import SignInButton from '../SignInButton';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
