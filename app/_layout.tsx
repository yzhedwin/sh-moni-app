import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { SplashScreenController } from "@/components/splash-screen-controller";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AuthProvider from "@/providers/auth-provider";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export const unstable_settings = {
  anchor: "(protected)",
};

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();
  if (isLoading) return null;

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: "#22c55e" }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            />
          ),
          error: (props) => (
            <ErrorToast {...props} style={{ borderLeftColor: "#ef4444" }} />
          ),
        }}
      />
    </ThemeProvider>
  );
}
