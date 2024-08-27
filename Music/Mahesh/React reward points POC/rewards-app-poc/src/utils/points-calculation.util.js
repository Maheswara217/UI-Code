export const calculatePoints = (amount) => {
  if (amount <= 50) return 0;
  if (amount <= 100) return amount - 50;
  return (amount - 100) * 2 + 50;
};

export const calculatePointsPerCustomer = (transactions) => {
  const pointsData = transactions.reduce((acc, { customerId, date, amount }) => {
    const [year, month] = date.split('-').slice(0, 2);
    const key = `${year}-${month}`;

    if (!acc[customerId]) acc[customerId] = { total: 0, months: {} };
    if (!acc[customerId].months[key]) acc[customerId].months[key] = 0;

    const points = calculatePoints(amount);
    acc[customerId].months[key] += points;
    acc[customerId].total += points;

    return acc;
  }, {});

  return pointsData;
};

export const sortByDate = (transactions) => {
  return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
};