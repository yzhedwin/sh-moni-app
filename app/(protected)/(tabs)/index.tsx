import Action from "@/components/action";
import TransactionList, { Transaction } from "@/components/transaction-list";
import { supabase } from "@/lib/supabase";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const { data: transactions, error } = await supabase
          .from("transactions")
          .select();
        if (error) {
          console.error("Error fetching transactions:", error.message);
          return;
        }

        if (transactions && transactions.length > 0) {
          setTransactions(transactions);
        }
      } catch (error: any) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    getTransactions();
  }, []);

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
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#6ee7b7", "#34d399", "#059669"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Total Monthly Spending</Text>
            <Text style={styles.balance}>
              ${getExpenditure(expenditureMonth?.month)?.amount}
            </Text>
          </View>
          <View style={styles.period}>
            <Text style={styles.periodLabel}>Current Period</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.periodRow}
            >
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
                      expenditureMonth.month === m.month
                        ? "#059669"
                        : "#f3f4f6",
                  }}
                >
                  <Text
                    style={{
                      color:
                        expenditureMonth.month === m.month ? "#fff" : "#111",
                    }}
                  >
                    {m.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <Action
              icon="add"
              label="Add Expense"
              onPress={() => chatSheetRef.current?.expand()}
            />
            <Action
              icon="cloud-upload"
              label="Upload File"
              onPress={() => uploadSheetRef.current?.expand()}
            />
            <Action icon="stats-chart" label="Analytics" />
          </View>
        </View>

        <ScrollView style={styles.section}>
          <TransactionList
            transactions={transactions || []}
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginHorizontal: 4,
  },

  balanceLabel: {
    color: "white",
    opacity: 0.9,
    fontSize: 16,
  },

  balance: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  balanceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  periodRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
  },
  period: {
    display: "flex",
    flexDirection: "column",
  },
  periodLabel: {
    color: "#fff",
    opacity: 0.9,
  },
});
