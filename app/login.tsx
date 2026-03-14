import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { AppleSignInButton } from "@/components/social-auth-buttons/apple/apple-sign-in-button";
import SignInWithEmailButton from "@/components/social-auth-buttons/email/sign-in-button";
import { ThemedView } from "@/components/themed-view";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <ThemedView style={styles.container}>
        <SignInWithEmailButton />
        <AppleSignInButton />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
