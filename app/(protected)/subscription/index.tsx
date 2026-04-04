// import { Button } from '@expo/ui/jetpack-compose';
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CheckoutButton from "./stripe-checkout";

/**
 * TODO: update css to make card look more modern
 * @returns
 */
export default function SubscriptionCard() {
  const [publishableKey, setPublishableKey] = useState("");

  const fetchPublishableKey = async () => {
    // const key = await fetchKey(); // fetch key from your server here;
    setPublishableKey(process.env.EXPO_PUBLIC_STRIPE_PUBIC_KEY || "");
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="prosh2" // required for Apple Pay
      urlScheme="shmoniapp" // required for 3D Secure and bank redirects
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
          backgroundColor: "white",
          padding: 16,
        }}
      >
        <View>
          <View style={{ maxWidth: 300, width: "100%", borderRadius: 16 }}>
            <View style={{ padding: 24, flexDirection: "column", gap: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                🚀 Upgrade Your Plan
              </Text>
              <Text>
                Get more out of Moni by upgrading your membership plan.
              </Text>

              <View style={{ flexDirection: "column", gap: 8 }}>
                <Text>✅ Higher submission limits</Text>
                <Text>⚡ Faster processing</Text>
                <Text>🔒 Advanced reporting tools</Text>
                <Text>💬 Priority support</Text>
              </View>

              <View style={{ display: "flex", justifyContent: "center" }}>
                {/* <Button title="Upgrade Now" onPress={upgradePlan} /> */}
                <CheckoutButton />
              </View>

              <Text
                style={{ fontSize: 12, color: "gray", textAlign: "center" }}
              >
                Already subscribed? Manage your plan in settings.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </StripeProvider>
  );
}
