// utils.test.js
import { calculatePoints, calculatePointsPerCustomer, sortByDate } from './points-calculation.util';

describe('Utility Functions', () => {
  test('calculatePoints should correctly calculate reward points', () => {
    expect(calculatePoints(120)).toBe(90);  // 2x20 + 1x50 = 90
    expect(calculatePoints(80)).toBe(30);   // 1x30 = 30
    expect(calculatePoints(50)).toBe(0);    // No points for <= 50
    expect(calculatePoints(100)).toBe(50);  // 1x50 = 50
  });

  test('calculatePointsPerCustomer should aggregate points correctly', () => {
    const transactions = [
      { customerId: 1, date: '2024-01-15', amount: 120 },
      { customerId: 1, date: '2024-02-10', amount: 80 },
      { customerId: 2, date: '2024-03-20', amount: 200 },
    ];

    const result = calculatePointsPerCustomer(transactions);

    expect(result[1].total).toBe(120);  // 90 + 30 = 120
    expect(result[1].months['2024-01']).toBe(90);
    expect(result[1].months['2024-02']).toBe(30);
    expect(result[2].total).toBe(250);  // 2x100 + 1x50 = 250
    expect(result[2].months['2024-03']).toBe(250);
  });

  test('sortByDate should sort transactions by date', () => {
    const transactions = [
      { customerId: 1, date: '2024-03-15', amount: 120 },
      { customerId: 1, date: '2024-01-15', amount: 120 },
      { customerId: 1, date: '2024-02-15', amount: 120 },
    ];

    const sortedTransactions = sortByDate(transactions);

    expect(sortedTransactions[0].date).toBe('2024-01-15');
    expect(sortedTransactions[1].date).toBe('2024-02-15');
    expect(sortedTransactions[2].date).toBe('2024-03-15');
  });
});
