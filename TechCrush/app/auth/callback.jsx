import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { supabase } from "../../src/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const handleDeepLink = async (url) => {
      if (!url) return;

      try {
        const urlObj = new URL(url);
        const code = urlObj.searchParams.get("code");
        const type = urlObj.searchParams.get("type") || urlObj.hash.split("type=")[1]?.split("&")[0];

        let error = null;

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          error = exchangeError;
        } else {
          const { error: sessionError } = await supabase.auth.getSessionFromUrl({ url });
          error = sessionError;
        }
        if (error) throw error;
        if (type === "signup" || url.includes("signup")) {
          alert("Email Confirmed! Please login");
          router.replace("/auth/sign-in");
        } else if (type === "recovery" || url.includes("recovery")) {
          router.replace("/auth/forgot-password");
        } else {
          router.replace("/(tabs)/home");
        }
      } catch (err) {
        console.log("Callback Error:", err.message);
        setErrorMsg(err.message);
        setTimeout(() => router.replace("/auth/sign-in"), 2000);
      }
    };
    const subscription = Linking.addEventListener("url", ({ url }) => handleDeepLink(url));

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });
    return () => subscription.remove();
  }, []);
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor: isDark? "#111827" : "#F9FAFB"}}>
      <ActivityIndicator size="large" color="#fa0808"/>
      <Text style={{marginTop: 10, color: isDark? "#F9FAFB" : "#111"}}>
        {errorMsg? `Error: ${errorMsg}` : "Verifying..."}
      </Text>
    </View>
  );
}

