import { TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-gesture-handler";

export default function InputBar({ input, setInput, onSend }: any) {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: "#1e293b",
        padding: 10,
        backgroundColor: "#0f172a",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1e293b",
          borderRadius: 20,
          paddingHorizontal: 12,
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="What did you spend today?"
          placeholderTextColor="#94a3b8"
          value={input}
          onChangeText={setInput}
          style={{ flex: 1, color: "white", paddingVertical: 12 }}
        />

        <TouchableOpacity onPress={onSend}>
          <Text style={{ color: "#38bdf8", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
