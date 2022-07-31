import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { createClient } from '../../services/prismic';

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: { type: 'fake-content-type', text: '<p>My new post excerpt</p>' },
  updatedAt: '10 de Abril',
};

jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../services/prismic');

describe('Post preview page', () => {
  it('should render correctly', () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<PostPreview post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue Reading?')).toBeInTheDocument();
  });

  it('should redirect user to full post when user is subscribed', () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    useSessionMocked.mockReturnValueOnce({
      data: { activeSubscription: 'fake-active-subscription' },
      status: 'unauthenticated',
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  it('should load initial data', async () => {
    const createClientPrismicMocked = jest.mocked(createClient);

    createClientPrismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: 'My new post',
          content: [{ type: 'paragraph', text: 'post content' }],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any);

    const response = await getStaticProps({
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
