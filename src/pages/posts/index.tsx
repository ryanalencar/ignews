import moment from 'moment';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { createClient } from '../../services/prismic';
import styles from './posts.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

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

interface IPostsProps {
  posts: Post[];
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <a key={post.slug} href="#">
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
