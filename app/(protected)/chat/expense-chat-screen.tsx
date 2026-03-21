import Footer from "@/components/chat/footer";
import InputBar from "@/components/chat/input-bar";
import MessageBubble, { Message } from "@/components/chat/message-bubble";
import { DUMMY_TRANSACTIONS } from "@/constants/dummy";
import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/model/supabase-types";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as Crypto from "expo-crypto";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

interface Props {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  categories: Tables<"categories">[] | undefined;
}

export default function ExpenseChatScreen({ sheetRef, categories }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Tables<"transactions">[]>(
    [],
  );
  const { profile } = useAuthContext();
  const snapPoints = useMemo(() => ["70%"], []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    //TODO: fetch from API
    setTimeout(() => {
      const t =
        DUMMY_TRANSACTIONS[
          Math.floor(Math.random() * DUMMY_TRANSACTIONS.length)
        ];

      const categoryID = categories?.find((c) => c.name === t!.category)?.id;
      const parsed: Tables<"transactions">[] = [
        {
          id: Crypto.randomUUID(),
          currency: t!.currency,
          is_recurring: t!.is_recurring || false,
          amount: t!.amount,
          category_id: categoryID || "others",
          description: t!.description,
          transaction_date: t!.transaction_date.toISOString(),
          account_id: null,
          created_at: new Date().toISOString(),
          metadata: null,
          updated_at: new Date().toISOString(),
          user_id: profile.id,
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
    field: keyof Tables<"transactions">,
    value: any,
  ) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );
  };

  const saveTransactions = async () => {
    console.log("Saving:", transactions);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert(transactions)
        .select();
    } catch (error) {
      console.debug(error);
    }
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
              categories={categories}
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
