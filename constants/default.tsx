import { Tables } from "@/model/supabase-types";
import { randomUUID } from "expo-crypto";

export const DEFAULT_CATEGORIES = [
  {
    name: "Food",
    id: randomUUID(),
  },
  {
    name: "Groceries",
    id: randomUUID(),
  },
  {
    name: "Entertainment",
    id: randomUUID(),
  },
  {
    name: "Health",
    id: randomUUID(),
  },
  {
    name: "Transport",
    id: randomUUID(),
  },
  {
    name: "Bills",
    id: randomUUID(),
  },
  {
    name: "Shopping",
    id: randomUUID(),
  },
] as Tables<"categories">[];
