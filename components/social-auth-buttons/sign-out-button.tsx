import { supabase } from "@/lib/supabase";
import React from "react";
import { Button } from "react-native";
import Toast from "react-native-toast-message";

export async function onSignOutButtonPress() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
    Toast.show({
      type: "success",
      text1: "Signed out successfully",
    });
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export default function SignOutButton() {
  return <Button title="Sign out" onPress={onSignOutButtonPress} />;
}
