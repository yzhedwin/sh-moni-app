import Action from "@/components/action";
import TransactionList, {
  DUMMY_TRANSACTIONS,
} from "@/components/transaction-list";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import ExpenseChatScreen from "../chat/expense-chat-screen";

//to fetch from db on refresh
const DUMMY_TOTAL_EXPENDITURES = [
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
type ExpenditureMonth = {
  month: number;
  year: number;
  label: string;
  value: string;
};
export default function HomeScreen() {
  const uploadSheetRef = useRef<BottomSheet>(null);
  const chatSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [expenditureMonth, setExpenditureMonth] = useState<ExpenditureMonth>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    label: new Date().toLocaleString("default", {
      month: "short",
      year: "numeric",
    }), // e.g. "Mar 2026"
    value: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`, // unique key}
  });

  const getExpenditure = (month: number) => {
    return DUMMY_TOTAL_EXPENDITURES.find((item) => item.month === month);
  };
  const getPast6Months = () => {
    const months: ExpenditureMonth[] = [];
    const now = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      months.push({
        label: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }), // e.g. "Mar 2026"
        value: `${date.getFullYear()}-${date.getMonth() + 1}`, // unique key
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }

    return months.reverse();
  };

  const months = getPast6Months();

  return (
    <GestureHandlerRootView style={styles.container}>
      <LinearGradient
        colors={["#6ee7b7", "#34d399", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.balanceLabel}>Monthly Expenditure</Text>
        <Text style={styles.balance}>
          ${getExpenditure(expenditureMonth?.month)?.amount}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {months.map((m) => (
            <Pressable
              key={m.value}
              onPress={() => setExpenditureMonth(m)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor:
                  expenditureMonth.month === m.month ? "#059669" : "#f3f4f6",
              }}
            >
              <Text
                style={{
                  color: expenditureMonth.month === m.month ? "#fff" : "#111",
                }}
              >
                {m.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <Action icon="add" label="Add Expense" />
          <Action
            icon="cloud-upload"
            label="Upload File"
            onPress={() => uploadSheetRef.current?.expand()}
          />
          <Action
            icon="stats-chart"
            label="Analytics"
            onPress={() => chatSheetRef.current?.expand()}
          />
        </View>
      </View>

      <ScrollView style={styles.section}>
        <TransactionList
          transactions={DUMMY_TRANSACTIONS}
          selectedMonth={expenditureMonth.month}
          selectedYear={expenditureMonth.year}
        />
      </ScrollView>
      <ExpenseChatScreen sheetRef={chatSheetRef} />
      <BottomSheet
        ref={uploadSheetRef}
        index={-1} // closed by default
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          width: 40,
          height: 5,
          backgroundColor: "#ccc",
          borderRadius: 10,
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <BottomSheetView style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Upload Options
          </Text>

          <Pressable style={styles.sheetButton}>
            <Text>📷 Take Photo</Text>
          </Pressable>

          <Pressable style={styles.sheetButton}>
            <Text>🖼️ Upload from Gallery</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
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
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  sheetButton: {
    padding: 16,
    marginTop: 12,
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
  },
});
