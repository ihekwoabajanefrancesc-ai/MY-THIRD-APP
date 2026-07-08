import { useEffect, useState } from "react";
import { View, Image, useColorScheme } from "react-native";
import { Stack, SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setIsAppReady] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bg = isDark ? "#111827" : "#F9FAFB";

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{
        flex:1, 
        backgroundColor: bg,
        justifyContent:"center", 
        alignItems:"center", 
        paddingVertical:150
      }}>
        <Image
          source={require("../assets/images/Tlogo.png")} 
          style={{width:200, height:200, resizeMode:"contain"}}
        />
        <Image
          source={require("../assets/images/techcrush-logo.png")} 
          style={{width:300, height:300, resizeMode:"contain"}}
        />
      </View>
    )
  }
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {backgroundColor: bg}
      }}
    >
      <Stack.Screen name="index"/>
      <Stack.Screen name="auth"/>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="contact"/>
    </Stack>
  );
}

