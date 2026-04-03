export const CATEGORIES = {
  FOOD: { name: 'Food & Dining', color: '#f43f5e', icon: 'Utensils' }, // Rose-500
  TRANSPORT: { name: 'Transport', color: '#0ea5e9', icon: 'Car' }, // Sky-500
  SHOPPING: { name: 'Shopping', color: '#f59e0b', icon: 'ShoppingBag' }, // Amber-500
  ENTERTAINMENT: { name: 'Entertainment', color: '#8b5cf6', icon: 'Gamepad' }, // Violet-500
  HEALTH: { name: 'Health', color: '#10b981', icon: 'PlusCircle' }, // Emerald-500
  UTILITIES: { name: 'Utilities', color: '#64748b', icon: 'Zap' }, // Slate-500
  INCOME: { name: 'Income', color: '#22c55e', icon: 'TrendingUp' }, // Green-500
  OTHER: { name: 'Other', color: '#94a3af', icon: 'MoreHorizontal' }
};

export const MOCK_TRANSACTIONS = [
  { id: '1', date: '2026-03-28', amount: 2500, category: 'INCOME', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2026-03-29', amount: 45.50, category: 'FOOD', type: 'expense', description: 'Lunch at Joe\'s' },
  { id: '3', date: '2026-03-30', amount: 120.00, category: 'SHOPPING', type: 'expense', description: 'New Running Shoes' },
  { id: '4', date: '2026-03-31', amount: 30.00, category: 'TRANSPORT', type: 'expense', description: 'Uber Ride' },
  { id: '5', date: '2026-04-01', amount: 85.00, category: 'HEALTH', type: 'expense', description: 'Pharmacy' },
  { id: '6', date: '2026-04-02', amount: 15.00, category: 'ENTERTAINMENT', type: 'expense', description: 'Netflix Subscription' },
  { id: '7', date: '2026-04-02', amount: 500, category: 'INCOME', type: 'income', description: 'Freelance Design' },
  { id: '8', date: '2026-03-25', amount: 200, category: 'UTILITIES', type: 'expense', description: 'Electricity Bill' },
  { id: '9', date: '2026-03-20', amount: 60, category: 'FOOD', type: 'expense', description: 'Grocery Shopping' },
  { id: '10', date: '2026-03-15', amount: 100, category: 'TRANSPORT', type: 'expense', description: 'Fuel Refill' },
  { id: '11', date: '2026-03-10', amount: 1200, category: 'INCOME', type: 'income', description: 'Bonus' },
  { id: '12', date: '2026-03-05', amount: 55, category: 'FOOD', type: 'expense', description: 'Dinner Date' },
  { id: '13', date: '2026-04-01', amount: 300, category: 'SHOPPING', type: 'expense', description: 'Electronics' },
];

export const INITIAL_USER = {
  name: 'Alex Rivera',
  role: 'admin', // or 'viewer'
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
};
