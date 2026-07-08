import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert, useColorScheme, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../../src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [canReset, setCanReset] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setCanReset(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSendResetLink = async () => {
    if (!email) return Alert.alert("Error", "Enter your email");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "techcrush://auth/callback",
    });
    setLoading(false);
    if (error) Alert.alert("Error", error.message);
    else Alert.alert("Check your email", "We sent a reset link to your email. Click it to continue");
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) return Alert.alert("Error", "Passwords do not match");
    if (newPassword.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");

    setLoading(true);
    const { error } = await supabase.auth.updateUser({password: newPassword});
    setLoading(false);

    if (error) Alert.alert("Error", error.message);
    else {
      Alert.alert("Success", "Password updated. Please login");
      router.replace("/auth/sign-in");
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.bg}]}>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, {color: theme.text}]}>Forgot Password</Text>
          
          {!canReset ? (
            <>
              <Text style={[styles.subtitle, {color: theme.subtext}]}>Enter your email to receive a reset link</Text>
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
              <TouchableOpacity style={[styles.button, {backgroundColor: theme.button}]} onPress={handleSendResetLink} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.buttonText}>Send Reset Link</Text>}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[styles.subtitle, {color: theme.subtext}]}>Enter your new password</Text>
              <View style={[styles.passwordContainer, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
                <TextInput
                  style={[styles.passwordInput, {color: theme.text}]}
                  placeholder="New Password"
                  placeholderTextColor={theme.placeholder}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeButton}>
                  <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color={theme.subtext}/>
                </TouchableOpacity>
              </View>
              <View style={[styles.passwordContainer, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
                <TextInput
                  style={[styles.passwordInput, {color: theme.text}]}
                  placeholder="Confirm New Password"
                  placeholderTextColor={theme.placeholder}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color={theme.subtext}/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.button, {backgroundColor: theme.button}]} onPress={handleUpdatePassword} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.buttonText}>Save New Password</Text>}
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.back, {color: theme.button}]}>Back to Sign In</Text>
          </TouchableOpacity>
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
  content: {padding:24, flexGrow:1, justifyContent:"center"},
  title: {fontSize:28, fontWeight:"bold", textAlign:"center", marginBottom:10},
  subtitle: {fontSize:14, textAlign:"center", marginBottom:30},
  input: {padding:15, borderRadius:10, marginBottom:15, borderWidth:1, height:48},
  passwordContainer: {flexDirection:"row", alignItems:"center", borderRadius:10, marginBottom:15, borderWidth:1},
  passwordInput: {flex:1, padding:15},
  eyeButton: {paddingHorizontal:15},
  button: {padding:16, borderRadius:10, alignItems:"center", marginBottom:20, height:50, justifyContent:"center"},
  buttonText: {color:"#fff", fontSize:16, fontWeight:"bold"},
  back: {textAlign:"center", fontWeight:"bold"},
});

