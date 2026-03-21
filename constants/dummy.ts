import { TransactionType } from "@/components/transactions";

export const DUMMY_TRANSACTIONS = [
  {
    transaction_date: new Date("2026-01-01"),
    amount: -20,
    category: "Food",
    description: "KFC",
    currency: "SGD",
  },
  {
    transaction_date: new Date("2026-01-26"),
    amount: -12,
    category: "Food",
    description: "McDonalds",
    currency: "SGD",
  },
  {
    transaction_date: new Date("2026-01-13"),
    amount: -15,
    category: "Food",
    description: "HDL",
    currency: "SGD",
  },
  {
    transaction_date: new Date("2026-01-25"),
    amount: -25,
    category: "Food",
    description: "Burger King",
    currency: "SGD",
  },
  {
    transaction_date: new Date("2026-01-12"),
    amount: -6,
    category: "Food",
    description: "Pizza Hut",
    currency: "SGD",
  },
  {
    transaction_date: new Date("2026-01-05"),
    amount: -7,
    category: "Food",
    description: "Subway",
    currency: "SGD",
  },
  {
    transaction_date: new Date("2026-01-03"),
    amount: -7,
    category: "Food",
    description: "Starbucks",
    currency: "SGD",
  },
  {
    transaction_date: new Date("2026-01-01"),
    amount: -12,
    category: "Food",
    description: "Taco Bell",
    currency: "SGD",
  },
] as TransactionType[];

export const DUMMY_TOTAL_EXPENDITURES = [
  {
    id: "1",
    month: 10,
    amount: 1200,
  },
  {
    id: "2",
    month: 11,
    amount: 250,
  },
  {
    id: "3",
    month: 12,
    amount: 50,
  },
  {
    id: "4",
    month: 1,
    amount: 1500,
  },
  {
    id: "5",
    month: 2,
    amount: 620,
  },
  {
    id: "6",
    month: 3,
    amount: 820,
  },
];
