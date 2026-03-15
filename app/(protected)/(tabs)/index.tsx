import Action from "@/components/action";
import Transaction from "@/components/transactions";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#6ee7b7", "#34d399", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>$4,285.20</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <Action icon="add" label="Add Expense" />
          <Action
            icon="cloud-upload"
            label="Upload File"
            onPress={() => {
              router.push("/upload");
            }}
          />
          <Action
            icon="stats-chart"
            label="Analytics"
            onPress={() => {
              router.push("/analytics");
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <Transaction name="Starbucks" category="Food" amount="- $6.40" />
        <Transaction name="Grab" category="Transport" amount="- $14.90" />
        <Transaction name="Salary" category="Income" amount="+ $2,400" />
        <Transaction name="Amazon" category="Shopping" amount="- $82.10" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  balanceLabel: {
    color: "white",
    opacity: 0.9,
  },

  balance: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginTop: 6,
  },

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
