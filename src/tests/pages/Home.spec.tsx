import { render, screen } from '@testing-library/react';

import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next/router');
jest.mock('next-auth/react');
jest.mock('../../services/stripe');

describe('Home page', () => {
  it('should render correctly', () => {
    render(<Home product={{ amount: 10, priceId: 'fake-price-id' }} />);

    expect(screen.getByText('for R$10.00 month')).toBeInTheDocument();
  });

  it('should load initial data from stripe', async () => {
    const retrieveStripePricesMocked = jest.mocked(stripe.prices.retrieve);
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            amount: 10,
            priceId: 'fake-price-id',
          },
        },
      }),
    );
  });
});
