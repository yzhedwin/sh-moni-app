import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  signInWithEmail,
  signUpNewUser,
} from "@/components/social-auth-buttons/email/sign-in-button";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Email and password required",
      });
      return;
    }
    try {
      setLoading(true);
      await signInWithEmail({ email, password });
      Toast.show({
        type: "success",
        text1: "Welcome back 👋",
        text2: "Login successful",
      });
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Incorrect email or password",
      });
    }
  };
  const handleSignUp = async () => {
    //TODO: navigate to sign up page
    setLoading(true);
    await signUpNewUser({ email, password });
    setLoading(false);
  };
  return (
    <LinearGradient
      colors={["#6ee7b7", "#34d399", "#059669"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color="#64748b" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color="#64748b" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.or}>or continue with</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-google" size={18} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={18} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.signup} onPress={handleSignUp}>
                Don&apos;t have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safe: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    maxWidth: 420,
    padding: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
  },

  loginBtn: {
    backgroundColor: "#000005",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  or: {
    textAlign: "center",
    marginVertical: 18,
    color: "#64748b",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 14,
  },

  socialBtn: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 12,
  },

  signup: {
    textAlign: "center",
    color: "#6366f1",
    marginTop: 10,
  },
});
