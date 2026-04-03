import {
  Utensils,
  Car,
  ShoppingBag,
  Gamepad2,
  Plus,
  Zap,
  TrendingUp,
  CircleHelp
} from 'lucide-react';

export const CATEGORY_ICONS = {
  FOOD: Utensils,
  TRANSPORT: Car,
  SHOPPING: ShoppingBag,
  ENTERTAINMENT: Gamepad2,
  HEALTH: Plus,
  UTILITIES: Zap,
  INCOME: TrendingUp,
  OTHER: CircleHelp
};

export const escapeCsv = (value) => {
  const stringValue = String(value ?? '');
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
};
