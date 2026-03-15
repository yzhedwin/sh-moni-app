import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Action({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#059669" />
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  actionCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  actionText: {
    marginTop: 6,
    fontSize: 12,
  },
});
