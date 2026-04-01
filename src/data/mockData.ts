export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Shopping"
  | "Utilities"
  | "Health"
  | "Investment";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export const categories: Category[] = [
  "Salary",
  "Freelance",
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Health",
  "Investment",
];

export const transactions: Transaction[] = [
  { id: "1", date: "2026-03-31", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2026-03-30", description: "Grocery Store", amount: 87.5, category: "Food", type: "expense" },
  { id: "3", date: "2026-03-29", description: "Uber Ride", amount: 24.0, category: "Transport", type: "expense" },
  { id: "4", date: "2026-03-28", description: "Netflix", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "5", date: "2026-03-27", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "6", date: "2026-03-26", description: "Electric Bill", amount: 142.0, category: "Utilities", type: "expense" },
  { id: "7", date: "2026-03-25", description: "New Shoes", amount: 89.99, category: "Shopping", type: "expense" },
  { id: "8", date: "2026-03-24", description: "Dentist Visit", amount: 200.0, category: "Health", type: "expense" },
  { id: "9", date: "2026-03-23", description: "Stock Purchase", amount: 500.0, category: "Investment", type: "expense" },
  { id: "10", date: "2026-03-22", description: "Restaurant", amount: 62.0, category: "Food", type: "expense" },
  { id: "11", date: "2026-03-21", description: "Gas Station", amount: 45.0, category: "Transport", type: "expense" },
  { id: "12", date: "2026-03-20", description: "Freelance Design", amount: 800, category: "Freelance", type: "income" },
  { id: "13", date: "2026-03-19", description: "Spotify", amount: 9.99, category: "Entertainment", type: "expense" },
  { id: "14", date: "2026-03-18", description: "Water Bill", amount: 38.0, category: "Utilities", type: "expense" },
  { id: "15", date: "2026-03-17", description: "Clothing Store", amount: 156.0, category: "Shopping", type: "expense" },
  { id: "16", date: "2026-03-16", description: "Pharmacy", amount: 32.5, category: "Health", type: "expense" },
  { id: "17", date: "2026-03-15", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "18", date: "2026-03-14", description: "Coffee Shop", amount: 18.0, category: "Food", type: "expense" },
  { id: "19", date: "2026-03-13", description: "Train Ticket", amount: 35.0, category: "Transport", type: "expense" },
  { id: "20", date: "2026-03-12", description: "Cinema", amount: 28.0, category: "Entertainment", type: "expense" },
];

export const balanceTrend = [
  { month: "Oct", balance: 12400 },
  { month: "Nov", balance: 13800 },
  { month: "Dec", balance: 12900 },
  { month: "Jan", balance: 14200 },
  { month: "Feb", balance: 15100 },
  { month: "Mar", balance: 16480 },
];

export const roles = ["Admin", "Viewer"] as const;
export type Role = (typeof roles)[number];
