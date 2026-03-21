import Footer from "@/components/chat/footer";
import InputBar from "@/components/chat/input-bar";
import MessageBubble, { Message } from "@/components/chat/message-bubble";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
};

interface Props {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
}

export default function ExpenseChatScreen({ sheetRef }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const snapPoints = useMemo(() => ["70%"], []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const parsed: Transaction[] = [
        {
          id: Date.now().toString(),
          amount: 18,
          category: "Food",
          description: "Lunch with John",
        },
      ];

      setTransactions(parsed);

      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "I found 1 expense. Review below 👇" },
      ]);

      setLoading(false);
    }, 1000);

    setInput("");
  };

  const updateTransaction = (
    id: string,
    field: keyof Transaction,
    value: any,
  ) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );
  };

  const saveTransactions = () => {
    console.log("Saving:", transactions);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
        {/* CHAT + REVIEW */}
        <BottomSheetFlatList
          data={messages}
          keyExtractor={(_: any, i: any) => i.toString()}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            padding: 16,
          }}
          renderItem={({ item }: { item: Message }) => (
            <MessageBubble item={item} />
          )}
          ListFooterComponent={
            <Footer
              loading={loading}
              transactions={transactions}
              updateTransaction={updateTransaction}
              saveTransactions={saveTransactions}
            />
          }
        />

        {/* INPUT BAR */}
        <InputBar input={input} setInput={setInput} onSend={sendMessage} />
      </View>
    </BottomSheet>
  );
}
