import { StyleSheet, Text, View } from "react-native";

export default function Transaction({ name, category, amount }: any) {
  return (
    <View style={styles.transaction}>
      <View>
        <Text style={styles.transactionName}>{name}</Text>
        <Text style={styles.transactionCategory}>{category}</Text>
      </View>
      <Text style={styles.transactionAmount}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transaction: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  transactionName: {
    fontWeight: "600",
  },

  transactionCategory: {
    color: "#64748b",
    fontSize: 12,
  },

  transactionAmount: {
    fontWeight: "600",
  },
});
