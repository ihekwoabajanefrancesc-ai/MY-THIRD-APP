import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useStore } from "../../src/store/useStore";

export default function Assessment() {
  const { isDark } = useStore();
  const params = useLocalSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState(params.tab || "Assignments");
  const assignments = [];
  const quizzes = [];
  const exams = [];

  useEffect(() => {
    if (params.tab) setTab(params.tab);
  }, [params.tab]);

  const theme = {
    bg: isDark ? "#0F172A" : "#F8FAFC",
    cardBg: isDark ? "#1E293B" : "#FFFFFF",
    border: isDark ? "#334155" : "#E2E8F0",
    title: isDark ? "#FFFFFF" : "#1E293B",
    subtitle: isDark ? "#94A3B8" : "#64748B",
    text: isDark ? "#FFFFFF" : "#1E293B",
    icon: isDark ? "#9CA3AF" : "#CBD5E1",
    headerIcon: "#fa0808",
    activeTab: "#fa0808",
    inactiveTab: isDark ? "#64748B" : "#94A3B8",
  };

  const renderEmpty = (type) => (
    <View style={[styles.emptyCard, {backgroundColor: theme.cardBg, borderColor: theme.border}]}>
      <Ionicons name="document-text-outline" size={48} color={theme.icon} />
      <Text style={[styles.emptyTitle, {color: theme.title}]}>No {type} Yet</Text>
      <Text style={[styles.emptyText, {color: theme.subtitle}]}>
        You don"t have any {type.toLowerCase()} at the moment. {"\n"}
        Check back later for updates from your tutors.
      </Text>
    </View>
  );

  const currentData = tab === "Assignments" ? assignments : tab === "Quizzes" ? quizzes : exams;

  return (
    <SafeAreaView style={{flex:1, backgroundColor: theme.bg}}>
      <Header/>
      <ScrollView contentContainerStyle={{padding:20}}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/home")} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.text}/>
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Ionicons name="document-text-outline" size={20} color={theme.headerIcon}/>
            <Text style={[styles.title, {color: theme.title}]}>{tab}</Text>
          </View>
          <Text style={[styles.subtitle, {color: theme.subtitle}]}>
            View and track your {tab.toLowerCase()}
          </Text>
        </View>
        <View style={[styles.tabContainer, {backgroundColor: theme.cardBg, borderColor: theme.border}]}>
          {["Assignments", "Quizzes", "Exams"].map((t) => (
            <TouchableOpacity key={t} style={styles.tabButton} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, {color: tab === t ? theme.activeTab : theme.inactiveTab, fontWeight: tab === t ? "700" : "500"}]}>
                {t}
              </Text>
              {tab === t && <View style={[styles.activeLine, {backgroundColor: theme.activeTab}]}/>}
            </TouchableOpacity>
          ))}
        </View>
        {currentData.length === 0 ? (
          renderEmpty(tab)
        ) : (
          currentData.map(item => <Text key={item.id}>{item.title}</Text>)
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
  tabContainer: {flexDirection: "row", borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 20},
  tabButton: {flex: 1, alignItems: "center", paddingVertical: 10, position: "relative"},
  tabText: {fontSize: 14},
  activeLine: {position: "absolute", bottom: 0, height: 2, width: "80%", borderRadius: 2},
  emptyCard: {borderRadius:12, borderWidth:1, padding:40, alignItems:"center", justifyContent: "center", gap: 12,
    shadowColor:"#000", shadowOffset:{width:0, height:2}, shadowOpacity:0.05, shadowRadius:4, elevation:2,
  },
  emptyTitle: {fontSize:18, fontWeight:"600", textAlign:"center"},
  emptyText: {fontSize:14, textAlign: "center", lineHeight:20},
  backBtn: {padding: 10, alignSelf: "flex-start", marginBottom: 10}
});

