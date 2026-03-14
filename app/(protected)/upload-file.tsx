import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UploadFile() {
  return (
    <View style={styles.center}>
      <Ionicons name="document-text" size={64} color="#10b981" />
      <Text style={styles.title}>Upload Receipt / PDF</Text>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>Select PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
  },
  uploadButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },

  uploadText: {
    color: "white",
    fontWeight: "600",
  },
});
