import { onSignOutButtonPress } from "@/components/social-auth-buttons/sign-out-button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
function SettingRow({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#64748b" />
      <Text style={styles.settingText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
    </TouchableOpacity>
  );
}
export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <SettingRow icon="person" label="Account" />
        <SettingRow icon="notifications" label="Notifications" />
        <SettingRow icon="card" label="Payment Methods" />
        <SettingRow icon="cloud-upload" label="Data Backup" />
        <SettingRow
          icon="cloud-upload"
          label="Get Premium"
          onPress={() => router.navigate("/subscription")}
        />
        <SettingRow
          icon="log-out"
          label="Logout"
          onPress={onSignOutButtonPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 14,
  },

  settingRow: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingText: {
    flex: 1,
    marginLeft: 12,
  },
});
