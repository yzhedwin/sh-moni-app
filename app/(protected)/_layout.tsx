import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isLoggedIn } = useAuthContext();
  // This renders the navigation stack for all authenticated app routes.
  if (!isLoggedIn) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="upload/index" options={{ headerShown: false }} />
      <Stack.Screen name="analytics/index" options={{ headerShown: false }} />
    </Stack>
  );
}
