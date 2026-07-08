import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import Header from "../../src/components/Header";
import { useStore } from "../../src/store/useStore";
import { useRouter } from "expo-router";

export default function Home() {
  const { user, isDark } = useStore();
  const router = useRouter();
  const firstName = user?.first_name || "Student";
  const regNumber = user?.reg_number || "MOD/2026/TC-7/0000";
  const avatarImage = user?.avatar_url
    ? { uri: user.avatar_url }
    : require("../../assets/images/Avatar.png");
  const theme = {
    bg: isDark ? "#111827" : "#F9FAFB",
    text: isDark ? "#fff" : "#111",
    subtext: isDark ? "#9CA3AF" : "#6B7280",
    button: "#fa0808",
    card: isDark ? "#1F2937" : "#fff"
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor: theme.bg}}>
      <Header/>
      <ScrollView contentContainerStyle={{padding:20}}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            style={styles.avatarContainer}
          >
            <Image 
              source={avatarImage}
              style={styles.avatar} 
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={{flex:1}}>
            <Text style={{fontSize:24, fontWeight:"bold", color: theme.text}}>
              Hello, {firstName}
            </Text>
            <Text style={{fontSize:14, marginTop:2, fontWeight:"500", color: theme.subtext}}>
              {regNumber}
            </Text>
          </View>
        </View>
        <View style={{gap:25, marginTop:30}}>
          <TouchableOpacity style={[styles.bigButton, {backgroundColor: theme.button}]} onPress={() => router.push("/(tabs)/attendance")}>
            <Text style={styles.buttonText}>My Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bigButton, {backgroundColor: theme.button}]} onPress={() => router.push({pathname: "/(tabs)/attendance", params: {tab: "Leaderboard"}})}>
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bigButton, {backgroundColor: theme.button}]} onPress={() => router.push("/(tabs)/assessment")}>
            <Text style={styles.buttonText}>Assignments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bigButton, {backgroundColor: theme.button}]} onPress={() => router.push({pathname: "/(tabs)/assessment", params: {tab: "Quizzes"}})}>
            <Text style={styles.buttonText}>Quizzes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bigButton, {backgroundColor: theme.button}]} onPress={() => router.push({pathname: "/(tabs)/assessment", params: {tab: "Exams"}})}>
            <Text style={styles.buttonText}>Exams</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bigButton, {backgroundColor: theme.button}]} onPress={() => router.push("/(tabs)/announcement")}>
            <Text style={styles.buttonText}>Announcements/Notifications</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={{color: theme.subtext}}>Need Help? </Text>
          <TouchableOpacity onPress={() => router.push("/contact")}>
            <Text style={{fontSize:16, color: theme.button, fontWeight:"bold"}}>Talk to your SSE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {flexDirection:"row", alignItems:"center", gap:15, marginBottom:8},
  avatarContainer: {borderRadius:50, overflow:"hidden", borderWidth:2, borderColor:"#fa0808"},
  avatar: {width:60, height:60, borderRadius:30, backgroundColor:"#ccc"},
  bigButton: {padding:15, borderRadius:15, alignItems:"center", height:70, justifyContent:"center"},
  buttonText: {color:"#fff", fontSize:16, fontWeight:"600" },
  footer: {flexDirection:"row", justifyContent:"flex-end", alignItems:"center", marginTop:30, paddingBottom:20}
});

