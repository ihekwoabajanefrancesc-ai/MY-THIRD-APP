import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/Header";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStore } from "../../src/store/useStore";

const Colors = {
  light: {
    bg:"#F8FAFC", card:"#FFFFFF", cardHeader:"#F1F5F9",
    text:"#0F172A", subtext:"#64748B", gold:"#D97706", border:"#E2E8F0", active:"#fa0808"
  },
  dark: {
    bg:"#0F172A", card:"#1E293B", cardHeader:"#334155",
    text:"#F8FAFC", subtext:"#94A3B8", gold:"#FBBF24", border:"#334155", active:"#fa0808"
  }
}
export default function Attendance() {
  const { isDark, user } = useStore();
  const theme = Colors[isDark ? "dark" : "light"];
  const params = useLocalSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState(params.tab || "Attendance");
  const [loading, setLoading] = useState(true);
  const [openSessions, setOpenSessions] = useState([]);
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const userFullName = `${user?.first_name || ""} ${user?.surname || ""}`.trim() || "You";

  useEffect(() => {
    fetchAttendanceData();
  }, []);
  useEffect(() => {
    if (params.tab) setTab(params.tab);
  }, [params.tab]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    setTimeout(() => {
      setOpenSessions([]);
      setHistory([]);
      setLeaderboard([
        {id: 1, name: "Aisha Bello", score: 98, rank: 1},
        {id: 2, name: "Emmanuel Okoro", score: 95, rank: 2},
        {id: 3, name: "Fatima Yusuf", score: 92, rank: 3},
        {id: 4, name: "John Doe", score: 88, rank: 4},
        {id: 5, name: userFullName, score: 85, rank: 5},
        {id: 6, name: "Grace Adams", score: 82, rank:6},
        {id: 7, name: "David Musa", score: 80, rank:7},
        {id: 8, name: "Blessing Oka", score: 78, rank:8},
        {id: 9, name: "Samuel Lee", score: 75, rank:9},
        {id: 10, name: "Chioma Eze", score: 70, rank:10},
      ]);
      setLoading(false);
    }, 1000);
  }

  const styles = getStyles(theme);

  const AttendanceContent = () => (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={20} color={theme.active}/>
          <Text style={styles.cardTitle}>Open Attendance Sessions</Text>
        </View>
        <Text style={styles.cardSubtitle}>Mark your attendance for ongoing classes.</Text>
        {loading ? <ActivityIndicator color={theme.gold} style={{marginTop:20}}/> :
          openSessions.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="information-circle-outline" size={24} color={theme.subtext}/>
              <Text style={styles.emptyText}>No open attendance sessions at the moment.</Text>
            </View>
          ) : null
        }
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="verified" size={18} color={theme.active}/>
          <Text style={styles.cardTitle}>Attendance History</Text>
        </View>
        <Text style={styles.cardSubtitle}>Track your past class attendance records.</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, {flex: 1.5}]}>SESSION</Text>
          <Text style={[styles.tableHeaderText, {flex: 1.5}]}>COURSE</Text>
          <Text style={[styles.tableHeaderText, {flex: 1}]}>DATE</Text>
          <Text style={[styles.tableHeaderText, {flex: 1}]}>STATUS</Text>
          <Text style={[styles.tableHeaderText, {flex: 1.5}]}>MARKED AT</Text>
        </View>
        {history.length === 0 && (
          <Text style={{color: theme.subtext, textAlign: "center", marginTop: 20}}>No history yet</Text>
        )}
      </View>
    </>
  )

  const LeaderboardContent = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="trophy" size={18} color={theme.active}/>
        <Text style={styles.cardTitle}>Class Leaderboard</Text>
      </View>
      <Text style={styles.cardSubtitle}>Top students by attendance percentage</Text>
      {loading ? <ActivityIndicator color={theme.gold} style={{marginTop:20}}/> :
        leaderboard.map((student) => {
          const isMe = student.name === userFullName;
          return (
            <View key={student.id} style={[styles.leaderRow, isMe && {backgroundColor: theme.active + "10"}]}>
              <Text style={[styles.rank, {color: student.rank <= 3 ? theme.active : theme.subtext}]}>#{student.rank}</Text>
              <View style={{flex:1}}>
                <Text style={[styles.studentName, {color: isMe ? theme.active : theme.text, fontWeight: isMe ? "700" : "600"}]}>
                  {student.name} {isMe && "(You)"}
                </Text>
                <Text style={[styles.studentScore, {color: theme.subtext}]}>{student.score}% Attendance</Text>
              </View>
              {student.rank <= 3 && <Ionicons name="medal" size={20} color={theme.active}/>}
            </View>
          )
        })
      }
    </View>
  )

  return (
    <SafeAreaView style={{flex:1, backgroundColor: theme.bg}}>
      <Header/>
      <ScrollView contentContainerStyle={{padding:20}}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/home")} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text}/>
        </TouchableOpacity>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.subtitle}>Track attendance and see class rankings.</Text>
        <View style={[styles.tabContainer, {backgroundColor: theme.card, borderColor: theme.border}]}>
          {["Attendance", "Leaderboard"].map((t) => (
            <TouchableOpacity key={t} style={styles.tabButton} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, {color: tab === t ? theme.active : theme.subtext, fontWeight: tab === t ? "700" : "500"}]}>
                {t}
              </Text>
              {tab === t && <View style={[styles.activeLine, {backgroundColor: theme.active}]}/>}
            </TouchableOpacity>
          ))}
        </View>
        {tab === "Attendance" ? <AttendanceContent/> : <LeaderboardContent/>}
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  title: {fontSize:22, fontWeight:"700", color:theme.text, marginBottom:4},
  subtitle: {fontSize:13, color:theme.subtext, marginBottom:20},
  tabContainer: {flexDirection: "row", borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 20},
  tabButton: {flex: 1, alignItems: "center", paddingVertical: 10, position: "relative"},
  tabText: {fontSize: 14},
  activeLine: {position: "absolute", bottom: 0, height: 2, width: "80%", borderRadius: 2},
  card: {backgroundColor: theme.card, borderRadius: 12, padding:16, marginBottom:16, borderWidth:1, borderColor:theme.border},
  cardHeader: {flexDirection:"row", alignItems:"center", gap:8, marginBottom:4},
  cardTitle: {fontSize:16, fontWeight:"600", color:theme.text},
  cardSubtitle: {fontSize:12, color:theme.subtext, marginBottom:16},
  emptyBox: {alignItems:"center", justifyContent:"center", paddingVertical:30, gap:8},
  emptyText: {color:theme.subtext, fontSize:13, fontStyle:"italic"},
  tableHeader: {flexDirection:"row", backgroundColor:theme.cardHeader, paddingVertical:10, paddingHorizontal:8, borderRadius:8, marginTop:12},
  tableHeaderText: {fontSize:11, fontWeight:"700", color:theme.subtext, textTransform:"uppercase"},
  leaderRow: {flexDirection:"row", alignItems:"center", gap:12, paddingVertical:12, borderBottomWidth:1, borderColor:theme.border, borderRadius:8, paddingHorizontal:8},
  rank: {fontSize:16, fontWeight:"bold", width:30},
  studentName: {fontSize:15, fontWeight:"600"},
  studentScore: {fontSize:12},
  backBtn: {padding: 10, alignSelf: "flex-start", marginBottom: 10}
});

