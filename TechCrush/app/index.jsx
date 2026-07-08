import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { supabase } from "../src/lib/supabase";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [session, setSession] = useState(undefined);
  
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });
  }, []);
  if (session) {
    return <Redirect href="/(tabs)/home"/>;
  } else {
    return <Redirect href="/auth/sign-in"/>;
  }
}

