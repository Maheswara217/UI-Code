import axios from 'axios';
import { sortByDate } from '../utils/points-calculation.util';

export const fetchTransactions = async () => {
  try {
    const response = await axios.get('https://66cd4e7b8ca9aa6c8cc9f2a6.mockapi.io/api/transactions');
    return sortByDate(response.data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};