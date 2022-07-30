import type { GetStaticProps } from 'next';
import Head from 'next/head';

import SubscribeButton from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from '../styles/home.module.scss';
import { formatPrice } from '../utils/formatPrice';

interface Product {
  priceId: string;
  amount: number;
}

interface IHomeProps {
  product: Product;
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KaOiyCroRuxxyCwloO1QCwo');

  const product = {
    priceId: price.id,
    amount: price.unit_amount ? price.unit_amount / 100 : 0,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 10, // 24 hours
  };
};

export default function Home({ product }: IHomeProps) {
  const { amount, priceId } = product;
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome </span>
          <h1>
            News about the
            <span> React </span>
            world.
          </h1>
          <p>
            Get access to all the publications
            <br />
            <span>for {formatPrice(amount)} month</span>
          </p>
          <SubscribeButton priceId={priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Person on computer" />
      </main>
    </>
  );
}
