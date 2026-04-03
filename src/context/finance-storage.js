import { INITIAL_USER, MOCK_TRANSACTIONS } from '../data/mockData';
import { STORAGE_KEYS } from './finance-constants';

const safeParse = (value, fallback = null) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const loadTransactions = () => {
  const parsed = safeParse(localStorage.getItem(STORAGE_KEYS.transactions));
  return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_TRANSACTIONS;
};

export const loadUser = () => {
  const parsed = safeParse(localStorage.getItem(STORAGE_KEYS.user));
  const role = parsed?.role === 'viewer' ? 'viewer' : 'admin';
  return { ...INITIAL_USER, role };
};

export const loadTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const persistTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
};

export const persistUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
};

export const persistTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
};
