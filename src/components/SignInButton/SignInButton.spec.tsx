import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import SignInButton from '.';

jest.mock('next-auth/react');

describe('SignInButton component', () => {
  it('should render correctly when is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<SignInButton />);

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  it('should render correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
        },
      },
      status: 'authenticated',
    });
    render(<SignInButton />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
