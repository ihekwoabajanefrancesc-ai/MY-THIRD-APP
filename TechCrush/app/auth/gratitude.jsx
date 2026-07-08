import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

export default function GoodbyeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={styles.box}>
        <Text style={[styles.title, {color: theme.text}]}>Thank you for the moment you shared with us</Text>
        <Text style={[styles.subtitle, {color: theme.subtext}]}>
          Do well to join us as soon as you can. 
        </Text>
        <Text style={[styles.question, {color: theme.text}]}>Ready to join again?</Text>
        <TouchableOpacity 
          style={[styles.signupBtn, {backgroundColor: theme.button}]} 
          onPress={() => router.replace("/auth/sign-up")}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const lightTheme = {
  bg: "#F9FAFB",
  text: "#111",
  subtext: "#6B7280",
  button: "#fa0808"
}
const darkTheme = {
  bg: "#111827",
  text: "#F9FAFB",
  subtext: "#9CA3AF",
  button: "#fa0808"
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent:"center", alignItems:"center", padding:20},
  box: {alignItems:"center", width: "100%"},
  title: {fontSize:22, fontWeight:"bold", textAlign:"center", marginBottom:10},
  subtitle: {fontSize:14, textAlign:"center", marginBottom:20},
  question: {fontSize:16, fontWeight:"600", marginBottom:20},
  signupBtn: {paddingVertical:14, paddingHorizontal:40, borderRadius:12, width: "80%"},
  signupText: {color:"#fff", fontWeight:"bold", fontSize:16, textAlign: "center"},
  loginLink: {marginTop: 15},
  loginText: {fontSize: 14, fontWeight: "600"}
})

