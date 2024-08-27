// api.test.js
import axios from 'axios';
import { fetchTransactions } from './Api';
import { sortByDate } from '../utils/points-calculation.util';

jest.mock('axios');

describe('API Simulation', () => {
  test('fetchTransactions should return sorted transactions', async () => {
    const mockData = [
      { customerId: 1, date: '2024-03-15', amount: 120 },
      { customerId: 1, date: '2024-01-15', amount: 120 },
      { customerId: 1, date: '2024-02-15', amount: 120 },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    const transactions = await fetchTransactions();
    const sortedTransactions = sortByDate(mockData);

    expect(transactions).toEqual(sortedTransactions);
  });

  test('fetchTransactions should handle API error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchTransactions()).rejects.toThrow('Network Error');
  });
});
