import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ActivityIndicator, Alert, useColorScheme, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in the required fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ 
      email: email.trim(), 
      password 
    });
    setLoading(false);
    if (error) {
      Alert.alert("Incorrect Email or Password", error.message);
    } else {
      router.replace("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.bg}]}>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Image 
              source={require("../../assets/images/Splash.png")} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, {color: theme.text}]}>Welcome!</Text>
            <Text style={[styles.subtitle, {color: theme.subtext}]}>Log in to TechCrush and explore your valid tech dreams.</Text>
            
            <Text style={[styles.label, {color: theme.text}]}>Email address</Text>
            <TextInput
              style={[styles.input, {backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text}]}
              placeholder="Email address"
              placeholderTextColor={theme.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Text style={[styles.label, {color: theme.text}]}>Password</Text>
            <View style={[styles.passwordContainer, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
              <TextInput
                style={[styles.passwordInput, {color: theme.text}]}
                placeholder="Password"
                placeholderTextColor={theme.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={theme.subtext} 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.forgotContainer}>
              <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
                <Text style={[styles.forgot, {color: theme.button}]}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, {backgroundColor: theme.button}]} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.buttonText}>Sign In</Text>}
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={[styles.footerText, {color: theme.subtext}]}>Do not have an account? </Text>
              <Link href="/auth/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={[styles.link, {color: theme.button}]}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const lightTheme = {
  bg: "#F9FAFB",
  inputBg: "#fff",
  text: "#111",
  subtext: "#6B7280",
  placeholder: "#9CA3AF",
  border: "#E5E7EB",
  button: "#fa0808"
}
const darkTheme = {
  bg: "#111827",
  inputBg: "#1F2937",
  text: "#F9FAFB",
  subtext: "#9CA3AF",
  placeholder: "#6B7280",
  border: "#374151",
  button: "#fa0808"
}

const styles = StyleSheet.create({
  container: {flex:1},
  scrollContent: {flexGrow:1},
  content: {padding:24, flex:1, justifyContent:"center"},
  logo: {width:120, height:120, alignSelf:"center", marginBottom:10},
  title: {fontSize:28, fontWeight:"bold", textAlign:"center", marginBottom:5},
  subtitle: {fontSize:12, textAlign:"center", marginBottom:30},
  label: {fontSize:14, fontWeight:"600", marginBottom:8},
  input: {padding:14, borderRadius:10, marginBottom:15, borderWidth:1, height:48},
  passwordContainer: {flexDirection:"row", alignItems:"center", borderRadius:10, marginBottom:10, borderWidth:1},
  passwordInput: {flex:1, paddingVertical:14, paddingHorizontal:14},
  eyeButton: {paddingHorizontal:12},
  forgotContainer: {alignItems:"flex-end", marginBottom:20},
  forgot: {fontSize:14, fontWeight:"600"},
  button: {padding:14, height:48, borderRadius:10, alignItems:"center", justifyContent: "center"},
  buttonText: {color:"#fff", fontSize:16, fontWeight:"bold"},
  footer: {flexDirection:"row", justifyContent:"center", marginTop:20},
  footerText: {},
  link: {fontWeight:"bold"},
});

