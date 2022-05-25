import { PrismicRichText } from '@prismicio/react';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

import { createClient } from '../../services/prismic';
import styles from './post.module.scss';

interface IPostsProps {
  post: {
    slug: string;
    banner: {
      url: string;
      alt: string;
    };
    title: string;
    content: {
      type: string;
      text: string;
      spans: { start: number; end: number; type: string }[];
    }[];
    updatedAt: string;
  };
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  previewData,
}) => {
  const session = await getSession({ req });
  const prismic = createClient({ req, previewData });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const prismicPost = await prismic.getByUID('post', String(slug));

  const post = {
    slug,
    banner: prismicPost.data.banner,
    title: prismicPost.data.title,
    content: prismicPost.data.content,
    updatedAt: moment(prismicPost.last_publication_date).format(
      'DD [de] MMMM [de] YYYY',
    ),
  };

  return { props: { post } };
};

export default function Post({ post }: IPostsProps) {
  const { content, title, updatedAt, banner } = post;

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      {banner && banner.url && (
        <section className={`${styles.mHero} ${styles.withPicture}`}>
          <div className={`${styles.mHeroPicture} ${styles.inPost}`}>
            <Image src={banner.url} alt={banner.alt} layout="fill" />
          </div>
        </section>
      )}
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{title}</h1>
          <time>{updatedAt}</time>
          <div className={styles.postContent}>
            <PrismicRichText field={content} />
          </div>
        </article>
      </main>
    </>
  );
}
