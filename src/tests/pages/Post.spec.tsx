import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/react';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { createClient } from '../../services/prismic';

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: { type: 'fake-content-type', text: '<p>My new post excerpt</p>' },
  updatedAt: '10 de Abril',
};

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

describe('Post page', () => {
  it('should render correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
  });

  it('should redirect user if no subscriptions is found', async () => {
    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      }),
    );
  });

  it('should load initial data', async () => {
    const getSessionMocked = jest.mocked(getSession);
    const createClientPrismicMocked = jest.mocked(createClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);
    createClientPrismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: 'My new post',
          content: [{ type: 'paragraph', text: 'post content' }],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          post: expect.objectContaining({
            banner: undefined,
            slug: 'my-new-post',
            title: 'My new post',
            content: [{ type: 'paragraph', text: 'post content' }],
            updatedAt: '01 de April de 2021',
          }),
        }),
      }),
    );
  });
});
