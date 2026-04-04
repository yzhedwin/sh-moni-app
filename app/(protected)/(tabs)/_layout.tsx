import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            // <GlassView style={styles.tintedGlassView} glassEffectStyle="clear">
            <IconSymbol
              size={28}
              name="doc.badge.gearshape.fill"
              color={color}
            />
            // </GlassView>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tintedGlassView: {
    position: "absolute",
    top: 250,
    left: 50,
    width: 200,
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
