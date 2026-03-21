import { CategoryRadialChart } from "@/components/charts/category-radial-chart";
import ExpenseBarChart from "@/components/charts/expense-bar-chart";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const monthlyData = [
  { month: "Jan", amount: 820 },
  { month: "Feb", amount: 1200 },
  { month: "Mar", amount: 950 },
  { month: "Apr", amount: 1500 },
  { month: "May", amount: 620 },
];

export const categoryData = [
  { x: "Food", y: 540 },
  { x: "Transport", y: 210 },
  { x: "Shopping", y: 380 },
  { x: "Bills", y: 260 },
];

export const DUMMY_EXPENSES = [
  { id: "1", name: "Rent", amount: 1200 },
  { id: "2", name: "Food", amount: 250 },
  { id: "3", name: "Transport", amount: 50 },
];

export type CategoryData = {
  category: string;
  amount: number;
};

export default function AnalyticsScreen() {
  const categoryData = DUMMY_EXPENSES.map(
    (item) => ({ category: item.name, amount: item.amount }) as CategoryData,
  );
  return (
    <ScrollView style={styles.container}>
      {/* SUMMARY CARD */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Spent This Month</Text>
        <Text style={styles.summaryAmount}>$1,542</Text>
      </View>

      {/* MONTHLY BAR CHART */}
      <Text style={styles.sectionTitle}>Monthly Spending</Text>

      <ExpenseBarChart />

      {/* CATEGORY CHART */}
      <Text style={styles.sectionTitle}>Category Breakdown</Text>

      <CategoryRadialChart data={categoryData} />

      {/* CATEGORY LEGEND */}
      <View style={styles.legend}>
        {categoryData.map((item) => (
          <View key={item.category} style={styles.legendRow}>
            <Text style={styles.legendName}>{item.category}</Text>
            <Text style={styles.legendAmount}>${item.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },

  summaryCard: {
    backgroundColor: "#10b981",
    padding: 24,
    borderRadius: 18,
    marginBottom: 30,
  },

  summaryLabel: {
    color: "white",
    opacity: 0.9,
  },

  summaryAmount: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  legend: {
    marginTop: 10,
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  legendName: {
    color: "#374151",
  },

  legendAmount: {
    fontWeight: "600",
  },
});
