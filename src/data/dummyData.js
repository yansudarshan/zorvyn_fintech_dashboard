import { subDays } from 'date-fns';

const today = new Date();

export const categories = [
  'Food', 'Travel', 'Shopping', 'Bills', 'Salary', 'Investments', 'Other'
];

export const dummyTransactions = [
  { id: '1', amount: 3250.00, category: 'Salary', type: 'Income', date: subDays(today, 2).toISOString(), description: 'Monthly Salary' },
  { id: '2', amount: 85.00, category: 'Food', type: 'Expense', date: subDays(today, 2).toISOString(), description: 'Grocery Store' },
  { id: '3', amount: 200.00, category: 'Salary', type: 'Income', date: subDays(today, 5).toISOString(), description: 'Freelance Project' },
  { id: '4', amount: 800.00, category: 'Travel', type: 'Expense', date: subDays(today, 7).toISOString(), description: 'Hotel Stay' },
  { id: '5', amount: 45.00, category: 'Food', type: 'Expense', date: subDays(today, 8).toISOString(), description: 'Fast Food' },
  { id: '6', amount: 150.00, category: 'Investments', type: 'Income', date: subDays(today, 10).toISOString(), description: 'Crypto Gains' },
  { id: '7', amount: 350.00, category: 'Shopping', type: 'Expense', date: subDays(today, 12).toISOString(), description: 'Electronics' },
  { id: '8', amount: 120.00, category: 'Bills', type: 'Expense', date: subDays(today, 15).toISOString(), description: 'Internet & Phone' },
  { id: '9', amount: 75.50, category: 'Food', type: 'Expense', date: subDays(today, 18).toISOString(), description: 'Coffee & Snacks' },
  { id: '10', amount: 3250.00, category: 'Salary', type: 'Income', date: subDays(today, 20).toISOString(), description: 'Monthly Salary' },
  { id: '11', amount: 180.00, category: 'Travel', type: 'Expense', date: subDays(today, 22).toISOString(), description: 'Uber Rides' },
  { id: '12', amount: 250.00, category: 'Shopping', type: 'Expense', date: subDays(today, 25).toISOString(), description: 'Christmas Gifts' },
  { id: '13', amount: 95.00, category: 'Bills', type: 'Expense', date: subDays(today, 28).toISOString(), description: 'Electricity Bill' },
  { id: '14', amount: 140.00, category: 'Bills', type: 'Expense', date: subDays(today, 30).toISOString(), description: 'Water Bill' },
  { id: '15', amount: 300.00, category: 'Salary', type: 'Income', date: subDays(today, 32).toISOString(), description: 'Bonus' },
];
