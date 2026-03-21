import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-gesture-handler";

export default function Footer({
  loading,
  transactions,
  updateTransaction,
  saveTransactions,
}: any) {
  return (
    <>
      {loading && <ActivityIndicator color="white" style={{ marginTop: 10 }} />}

      {transactions.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white", marginBottom: 8 }}>
            Review Transactions
          </Text>

          {transactions.map((t: any) => (
            <View
              key={t.id}
              style={{
                backgroundColor: "#1e293b",
                padding: 12,
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              <TextInput
                value={t.description}
                onChangeText={(text) =>
                  updateTransaction(t.id, "description", text)
                }
                style={{ color: "white", marginBottom: 6 }}
              />

              <TextInput
                value={String(t.amount)}
                keyboardType="numeric"
                onChangeText={(text) =>
                  updateTransaction(t.id, "amount", Number(text))
                }
                style={{ color: "white", marginBottom: 6 }}
              />

              <TextInput
                value={t.category}
                onChangeText={(text) =>
                  updateTransaction(t.id, "category", text)
                }
                style={{ color: "white" }}
              />
            </View>
          ))}

          <TouchableOpacity
            onPress={saveTransactions}
            style={{
              backgroundColor: "#22c55e",
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Save Expenses
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
