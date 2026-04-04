import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
export default function CheckoutButton() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { profile } = useAuthContext();

  const fetchUser = async () => {
    //fetch user from supabase here

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .single();
    if (error) {
      console.error("Select error:", error);
    } else {
      console.log("Select user:", data);
    }
    return {
      stripe_id: data.stripe_id,
      email: data.email,
      name: data.name,
    };
  };

  const fetchPaymentSheetParams = async () => {
    //fetch customer id here
    const { stripe_id } = await fetchUser();
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_MONI_API_URL}/payment-sheet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stripe_id, // send customer id to your server here
          // Include any additional data you want to send to your server here
        }),
      },
    );
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    //if customer id not in supabase update it
    if (stripe_id === null) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ stripe_id: customer })
        .eq("id", profile?.id);
      if (error) {
        console.error("Update error:", error);
      } else {
        console.log("Updated user with stripe_id:", data);
      }
    }
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "prosh2",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
        returnURL: "shmoniapp://stripe-redirect", // required for 3D Secure and bank redirects
      });
      if (!error) {
        console.debug("setting loading");
        setLoading(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.debug(`Error code: ${error.code}`, error.message);
    } else {
      console.debug("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Button disabled={!loading} title="Checkout" onPress={openPaymentSheet} />
    </View>
  );
}
