import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useStore } from "../../src/store/useStore";

export default function Announcements() {
  const { isDark } = useStore();
  const announcements = [];
  const router = useRouter();
  const theme = {
    bg: isDark ? "#0F172A" : "#F8FAFC",
    cardBg: isDark ? "#1E293B" : "#FFFFFF",
    border: isDark ? "#334155" : "#E2E8F0",
    title: isDark ? "#FFFFFF" : "#1E293B",
    subtitle: isDark ? "#94A3B8" : "#64748B",
    text: isDark ? "#FFFFFF" : "#1E293B",
    icon: isDark ? "#9CA3AF" : "#CBD5E1",
    headerIcon: "#fa0808",
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: theme.bg}}>
      <Header/>
      <ScrollView contentContainerStyle={{padding:20}}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/home")} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.text}/>
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Ionicons name="notifications-outline" size={20} color={theme.headerIcon}/>
            <Text style={[styles.title, {color: theme.title}]}>Announcements</Text>
          </View>
          <Text style={[styles.subtitle, {color: theme.subtitle}]}>
            Important updates from your tutors and courses
          </Text>
        </View>
        {announcements.length === 0 ? (
          <View style={[styles.emptyCard, {backgroundColor: theme.cardBg, borderColor: theme.border}]}>
            <Ionicons name="notifications-outline" size={48} color={theme.icon}/>
            <Text style={[styles.emptyTitle, {color: theme.title}]}>No Announcements Yet</Text>
            <Text style={[styles.emptyText, {color: theme.subtitle}]}>
              You don"t have any announcements at the moment. {"\n"}
              Kindly check back later for updates from your tutors.
            </Text>
          </View>
        ) : (
          announcements.map(item => <Text key={item.id}>{item.title}</Text>)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {marginBottom:20},
  headerRow: {flexDirection:"row", alignItems:"center", gap:8, marginBottom:4},
  title: {fontSize:24, fontWeight:"bold"},
  subtitle: {fontSize:14},
  emptyCard: {
    borderRadius:12, borderWidth:1, padding:40, alignItems:"center", justifyContent: "center", gap: 12,
    shadowColor:"#000", shadowOffset:{width:0, height:2}, shadowOpacity:0.05, shadowRadius:4, elevation:2,
  },
  emptyTitle: {fontSize:18, fontWeight:"600", textAlign:"center"},
  emptyText: {fontSize:14, textAlign: "center", lineHeight:20},
  backBtn: {padding: 10, alignSelf: "flex-start", marginBottom: 10}
});

