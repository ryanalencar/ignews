import moment from 'moment';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { createClient } from '../../services/prismic';
import styles from './posts.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface IPostsProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = createClient({ previewData });

  const response = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  });

  const posts = response.map<Post>((post) => ({
    slug: post.uid ?? '',
    title: post.data.title,
    excerpt:
      post.data.content.find((content) => content.type === 'paragraph')?.text ??
      '',
    updatedAt: moment(post.last_publication_date).format(
      'DD [de] MMMM [de] YYYY',
    ),
  }));

  return { props: { posts } };
};

export default function Posts({ posts }: IPostsProps) {
  const EXCERPT_CHAR_LIMIT = 150;

  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>
                  {post.excerpt.length <= EXCERPT_CHAR_LIMIT
                    ? post.excerpt
                    : `${post.excerpt.slice(0, EXCERPT_CHAR_LIMIT)}...`}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
