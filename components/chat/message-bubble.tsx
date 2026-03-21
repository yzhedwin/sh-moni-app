import { Text, View } from "react-native";

export type Message = {
  type: "user" | "ai";
  text: string;
};

export default function MessageBubble({ item }: { item: Message }) {
  return (
    <View
      style={{
        alignSelf: item.type === "user" ? "flex-end" : "flex-start",
        backgroundColor: item.type === "user" ? "#2563eb" : "#1e293b",
        padding: 12,
        borderRadius: 12,
        marginVertical: 4,
        maxWidth: "80%",
      }}
    >
      <Text style={{ color: "white" }}>{item.text}</Text>
    </View>
  );
}
