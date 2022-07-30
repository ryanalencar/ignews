import { render, screen } from '@testing-library/react';

import Home from '../../pages';

jest.mock('next/router');
jest.mock('next-auth/react');

describe('Home page', () => {
  it('should render correctly', () => {
    render(<Home product={{ amount: 10, priceId: 'fake-price-id' }} />);

    expect(screen.getByText('for R$10.00 month')).toBeInTheDocument();
  });
});
