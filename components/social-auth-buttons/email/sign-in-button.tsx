import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

async function signUpNewUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000", //change to prod url
    },
  });
  if (error != null) {
    console.error(error);
  }
  return data;
}
async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error != null) {
    console.error(error);
  }

  return data;
}

export default function SignInWithEmailButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    await signInWithEmail({ email, password });
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    await signUpNewUser({ email, password });
    setLoading(false);
  };

  return (
    <>
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
      />
      <Button title={"Sign up"} onPress={handleSignUp}></Button>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
