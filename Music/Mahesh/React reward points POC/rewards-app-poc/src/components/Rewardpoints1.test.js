// RewardPoints.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RewardPoints from './Rewardpoints1';
import { fetchTransactions } from '../http-services/Api';

jest.mock('./api');

describe('RewardPoints Component', () => {
  test('displays loading spinner initially', () => {
    fetchTransactions.mockResolvedValue([]);
    render(<RewardPoints />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays customer data correctly', async () => {
    const mockTransactions = [
      { customerId: 1, date: '2024-01-15', amount: 120 },
      { customerId: 1, date: '2024-02-10', amount: 80 },
    ];

    fetchTransactions.mockResolvedValue(mockTransactions);

    render(<RewardPoints />);

    await waitFor(() => {
      expect(screen.getByText('Customer 1')).toBeInTheDocument();
      expect(screen.getByText(/2024-01/i)).toBeInTheDocument();
      expect(screen.getByText('90 points')).toBeInTheDocument();
      expect(screen.getByText('Total Points:')).toHaveTextContent('120');
    });
  });

  test('handles API error gracefully', async () => {
    fetchTransactions.mockRejectedValueOnce(new Error('API Error'));

    render(<RewardPoints />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('API Error');
    });
  });
});
