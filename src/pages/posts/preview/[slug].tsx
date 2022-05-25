import { useEffect } from 'react';

import { PrismicRichText } from '@prismicio/react';
import moment from 'moment';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { createClient } from '../../../services/prismic';
import styles from '../post.module.scss';

interface IPostsPreviewProps {
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

export default function PostPreview({ post }: IPostsPreviewProps) {
  const { content, title, updatedAt, banner } = post;
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

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
          <div className={`${styles.postContent} ${styles.previewContent}`}>
            <PrismicRichText field={content} />
          </div>
          <div className={styles.continueReading}>
            Wanna continue Reading?
            <Link href="/">
              <a>Subscribe now</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const prismic = createClient({ previewData });
  const { slug } = params;

  const prismicPost = await prismic.getByUID('post', String(slug));

  const post = {
    slug,
    banner: prismicPost.data.banner,
    title: prismicPost.data.title,
    content: prismicPost.data.content.splice(0, 3),
    updatedAt: moment(prismicPost.last_publication_date).format(
      'DD [de] MMMM [de] YYYY',
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 30, // 30 minutes
  };
};
