import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export const DUMMY_TRANSACTIONS = [
  {
    id: "1",
    date: "2026-01-01",
    amount: -20,
    category: "Food",
    name: "KFC",
  },
  {
    id: "2",
    date: "2026-01-26",
    amount: -12,
    category: "Food",
    name: "McDonalds",
  },
  {
    id: "3",
    date: "2026-01-13",
    amount: -15,
    category: "Food",
    name: "HDL",
  },
  {
    id: "4",
    date: "2026-01-25",
    amount: -25,
    category: "Food",
    name: "Burger King",
  },
  {
    id: "5",
    date: "2026-01-12",
    amount: -6,
    category: "Food",
    name: "Pizza Hut",
  },
  {
    id: "6",
    date: "2026-01-05",
    amount: -7,
    category: "Food",
    name: "Subway",
  },
  {
    id: "7",
    date: "2026-01-03",
    amount: -7,
    category: "Food",
    name: "Starbucks",
  },
  {
    id: "8",
    date: "2026-01-02",
    amount: -12,
    category: "Food",
    name: "Taco Bell",
  },
] as Transaction[];

export default function TransactionList({
  transactions,
  selectedMonth,
  selectedYear,
}: Props) {
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear
      );
    });
  }, [transactions, selectedMonth]);

  const groupByDate = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, t) => {
        const date = new Date(t.date).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(t);
        return acc;
      },
      {} as Record<string, Transaction[]>,
    );
  }, [filteredTransactions]);

  return (
    <Animated.View entering={FadeIn} key={selectedMonth}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </Text>

      {filteredTransactions.length === 0 && (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: "#9ca3af" }}>No transactions this month</Text>
        </View>
      )}

      {Object.entries(groupByDate).map(([date, items]) => (
        <View key={date} style={{ marginBottom: 16 }}>
          <Text style={{ color: "#6b7280", marginBottom: 6 }}>{date}</Text>

          {items.map((t, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <View>
                <Text style={{ fontWeight: "500" }}>{t.name}</Text>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>
                  {t.category}
                </Text>
              </View>

              <Text
                style={{
                  fontWeight: "600",
                  color: t.amount > 0 ? "#059669" : "#ef4444",
                }}
              >
                {t.amount > 0 ? "+" : "-"} ${Math.abs(t.amount)}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </Animated.View>
  );
}

type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string; // ISO string
};

type Props = {
  transactions: Transaction[];
  selectedMonth: number;
  selectedYear: number;
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
  },
});
