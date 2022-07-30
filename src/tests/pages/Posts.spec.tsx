import { render, screen } from '@testing-library/react';

import Posts, { Post, getStaticProps } from '../../pages/posts';
import { createClient } from '../../services/prismic';

const posts: Post[] = [
  {
    slug: 'my-new-post',
    title: 'My new post',
    excerpt: 'My new post excerpt',
    updatedAt: '10 de Abril',
  },
];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('should render correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
  });

  it('should load initial data from prismic', async () => {
    const createClientPrismicMocked = jest.mocked(createClient);
    createClientPrismicMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: 'my-new-post',
          data: {
            title: 'My new post',
            content: [{ type: 'paragraph', text: 'post excerpt' }],
          },
          last_publication_date: '2022-04-21T19:30:29+0000',
        },
      ]),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'post excerpt',
              updatedAt: '21 de April de 2022',
            },
          ],
        },
      }),
    );
  });
});
