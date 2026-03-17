import Action from "@/components/action";
import Transaction from "@/components/transactions";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const uploadSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  return (
    <GestureHandlerRootView style={styles.container}>
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
            onPress={() => uploadSheetRef.current?.expand()}
          />
          <Action
            icon="stats-chart"
            label="Analytics"
            // onPress={() => bottomSheetRef.current?.expand()}
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
