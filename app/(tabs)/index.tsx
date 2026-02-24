import CategoryChart from "@/components/charts/category-chart";
import { TrendChart } from "@/components/charts/trend-chart";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";

const expenses = [
  { id: "1", name: "Rent", description: "February Rent", price: 1200 },
  { id: "2", name: "Food", description: "Groceries", price: 250 },
  { id: "3", name: "Transport", description: "MRT Top-up", price: 50 },
];

const CategoryRoute = () => (
  <View style={styles.chartContainer}>
    <CategoryChart />
  </View>
);

const TrendRoute = () => (
  <View style={styles.chartContainer}>
    <TrendChart />
  </View>
);

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: "category", title: "Category" },
    { key: "trend", title: "Trend" },
  ]);

  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.price, 0);
  }, []);

  const renderScene = SceneMap({
    category: CategoryRoute,
    trend: TrendRoute,
  });
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background",
  );

  return (
    <SafeAreaView style={[{ backgroundColor }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle">
          Show total expense for this month
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.totalContainer}>
        <ThemedText style={styles.totalLabel}>
          Total Expense This Month
        </ThemedText>
        <ThemedText type="title" style={styles.totalAmount}>
          ${totalExpense.toFixed(2)}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <TabView
          navigationState={{ index: tabIndex, routes }}
          renderScene={renderScene}
          onIndexChange={setTabIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={
            (props) => null
            // <TabBar
            //   {...props}
            //   indicatorStyle={{ backgroundColor: "black" }}
            //   style={{ backgroundColor: "black", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            // />
          }
        />
        <View style={styles.tabIndicator}>
          {routes.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: tabIndex === i ? "black" : "#ccc",
              }}
            />
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.sectionTitle}>Expense List</ThemedText>

        <View style={styles.tableHeader}>
          <ThemedText style={styles.headerCell}>Name</ThemedText>
          <ThemedText style={styles.headerCell}>Description</ThemedText>
          <ThemedText style={styles.headerCell}>Price</ThemedText>
        </View>

        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <ThemedText style={styles.cell}>{item.name}</ThemedText>
              <ThemedText style={styles.cell}>{item.description}</ThemedText>
              <ThemedText style={styles.cell}>
                ${item.price.toFixed(2)}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: "#0f120f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  totalContainer: {
    position: "absolute",
    top: 120,
    left: 16,
    right: 16,
    borderRadius: 12,
    backgroundColor: "#51089f",
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  totalLabel: {
    opacity: 0.6,
  },
  totalAmount: {
    marginTop: 24,
    fontWeight: "bold",
  },

  titleContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#efefef",
    marginTop: -30,
    paddingTop: 50,
    paddingBottom: 16,
    height: 400,
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
  },
  cell: {
    flex: 1,
  },
  tabIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
});
