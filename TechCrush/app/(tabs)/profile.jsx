import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Switch, StatusBar, ActivityIndicator } from "react-native";
import Header from "../../src/components/Header";
import { useStore } from "../../src/store/useStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { supabase } from "../../src/lib/supabase";

export default function ProfileScreen() {
  const { isDark, user, logout, setTheme, setUser } = useStore();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const firstName = user?.first_name || "";
  const surname = user?.surname || "";
  const fullName = `${firstName} ${surname}`.trim() || "Student";
  const email = user?.email || "student@techcrush.com";
  const phone = user?.phone || "Not set";
  const gender = user?.gender || "Not set";
  const dob = user?.date_of_birth || "Not set";
  const course = user?.course?.replace(/_/g, " ") || "Not set";
  const regNumber = user?.reg_number || "MOD/2026/TC-4/0000";
  const avatar = user?.avatar_url
   ? { uri: user.avatar_url }
    : require("../../assets/images/Avatar.png");

  const theme = {
    bg: isDark? "#111827" : "#F9FAFB",
    text: isDark? "#fff" : "#111",
    subtext: isDark? "#9CA3AF" : "#6B7280",
    card: isDark? "#1F2937" : "#fff",
    button: "#fa0808",
    switchTrack: isDark? "#374151" : "#E5E7EB"
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "No, cancel", style: "cancel" },
        {
          text: "Yes, I'm sure",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/auth/sign-in");
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/auth/gratitude");
          }
        },
      ]
    );
  };

  const toggleTheme = (value) => {
    setTheme(value? "dark" : "light");
  }

  const formatDate = (dateStr) => {
    if (dateStr === "Not set") return dateStr;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});
  }

  const handleChangeAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status!== 'granted') {
      Alert.alert("Permission needed", "Please grant camera roll permissions to change avatar");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    setUploading(true);
    try {
      const imageUri = result.assets[0].uri;
      const fileExt = imageUri.split('.').pop();
      const fileName = `${user.email}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const { error: uploadError } = await supabase.storage
       .from('avatars')
       .upload(filePath, blob, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const avatarUrl = data.publicUrl;
      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl }
      });

      if (updateError) throw updateError;
      setUser(updatedUser.user_metadata);
      Alert.alert("Success", "Avatar updated");
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
    } finally {
      setUploading(false);
    }
  }
  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <StatusBar
        barStyle={isDark? "light-content" : "dark-content"}
        backgroundColor={theme.bg}
      />
      <Header/>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/home")} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.text}/>
        </TouchableOpacity>
        <Text style={[styles.title, {color: theme.text}]}>Settings</Text>
        <View style={styles.avatarContainer}>
          <Image source={avatar} style={styles.avatar}/>
          <TouchableOpacity
            style={[styles.cameraBtn, {backgroundColor: theme.button}]}
            onPress={handleChangeAvatar}
            disabled={uploading}
          >
            {uploading?
              <ActivityIndicator size="small" color="#fff"/> :
              <Ionicons name="camera" size={18} color="#fff"/>
            }
          </TouchableOpacity>
        </View>
        <View style={[styles.card, {backgroundColor: theme.card}]}>
          <ProfileRow label="Full Name" value={fullName} theme={theme}/>
          <ProfileRow label="Reg Number" value={regNumber} theme={theme}/>
          <ProfileRow label="Email" value={email} theme={theme}/>
          <ProfileRow label="Phone" value={phone} theme={theme}/>
          <ProfileRow label="Gender" value={gender} theme={theme}/>
          <ProfileRow label="Date of Birth" value={formatDate(dob)} theme={theme}/>
          <ProfileRow label="Course" value={course} theme={theme} last/>
        </View>
        <View style={[styles.themeCard, {backgroundColor: theme.card}]}>
          <View style={styles.themeRow}>
            <Ionicons name={isDark? "moon" : "sunny"} size={22} color={isDark? "#FBBF24" : "#F59E0B"}/>
            <Text style={[styles.themeText, {color: theme.text}]}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.switchTrack, true: theme.button }}
              thumbColor={"#fff"}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff"/>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
          <Ionicons name="trash-outline" size={20} color="#EF4444"/>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const ProfileRow = ({ label, value, theme, last }) => (
  <View style={[styles.row,!last && {borderBottomWidth: 1, borderBottomColor: theme.subtext + "20"}]}>
    <Text style={[styles.label, {color: theme.subtext}]}>{label}</Text>
    <Text style={[styles.value, {color: theme.text}]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex:1},
  content: {padding:20, paddingBottom: 40},
  backBtn: {padding: 10, alignSelf: "flex-start", marginBottom:-10, marginTop:-5},
  title: {fontSize:24, fontWeight:"bold", marginBottom:20, textAlign:"center"},
  avatarContainer: {alignItems:"center", marginBottom:20, position:"relative"},
  avatar: {width: 110, height: 110, borderRadius: 55, borderWidth:3, borderColor:"#fa0808"},
  cameraBtn: {position: "absolute", bottom: 0, right: "35%", padding: 8, borderRadius: 20,
    borderWidth: 2, borderColor: "#fff", width: 36, height: 36, alignItems: "center", justifyContent: "center"
  },
  card: {padding:5, borderRadius:12, marginBottom:20},
  row: {paddingVertical: 12, paddingHorizontal: 15},
  label: {fontSize:12, marginBottom: 4},
  value: {fontSize:16, fontWeight:"600", textTransform: "capitalize"},
  themeCard: {borderRadius:12, marginBottom:20, paddingHorizontal: 15},
  themeRow: {flexDirection: "row", alignItems:"center", paddingVertical: 15, gap: 12},
  themeText: {fontWeight:"600", fontSize:16, flex: 1},
  logoutBtn: {backgroundColor:"#EF4444", padding:15, borderRadius:12, alignItems:"center",
    marginBottom:20, flexDirection: "row", gap: 8, justifyContent: "center"
  },
  logoutText: {color:"#fff", fontWeight:"bold", fontSize:16},
  deleteBtn: {backgroundColor:"transparent", padding:15, borderRadius:12, alignItems:"center",
    borderWidth: 1, borderColor: "#EF4444", flexDirection: "row", gap: 8, justifyContent: "center"
  },
  deleteText: {color:"#EF4444", fontWeight:"bold", fontSize:16},
});

