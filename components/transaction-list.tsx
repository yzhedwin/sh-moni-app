import { Tables } from "@/model/supabase-types";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
interface Props {
  categories: Tables<"categories">[];
  transactions: Tables<"transactions">[];
  selectedMonth: number;
  selectedYear: number;
}
export default function TransactionList({
  categories,
  transactions,
  selectedMonth,
  selectedYear,
}: Props) {
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.transaction_date);
      return (
        d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear
      );
    });
  }, [transactions, selectedMonth, selectedYear]);

  const groupByDate = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, t) => {
        const date = new Date(t.transaction_date).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(t);
        return acc;
      },
      {} as Record<string, Tables<"transactions">[]>,
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
                <Text style={{ fontWeight: "500" }}>{t.description}</Text>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>
                  {categories.find((c) => c.id === t.category_id)?.name}
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
