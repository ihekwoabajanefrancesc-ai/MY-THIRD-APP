import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Linking, useColorScheme } from "react-native";
import Header from "../src/components/Header";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ContactScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const router = useRouter();

  const theme = {
    bg: isDark? "#111827" : "#F9FAFB",
    text: isDark? "#fff" : "#111",
    subtext: isDark? "#9CA3AF" : "#6B7280",
    card: isDark? "#1F2937" : "#fff",
    button: "#fa0808"
  }

  const sse = {
    name: "Mr. Michael Adefolarin",
    phone: "+234 906 065 5269",
    email: "michael.adefolarin@techcrush.com",
    whatsapp: "2348148676947"
  }

  const openPhone = () => Linking.openURL(`tel:${sse.phone}`);
  const openEmail = () => Linking.openURL(`mailto:${sse.email}`);
  const openWhatsapp = () => Linking.openURL(`https://wa.me/${sse.whatsapp}`);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: theme.bg}}>
      <Header/>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/home")} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={theme.text}/>
        </TouchableOpacity>
        <Text style={[styles.title, {color: theme.text}]}>Talk to Your SSE</Text>
        <Text style={[styles.subtitle, {color: theme.subtext}]}>
          {sse.name} is here to help you with any questions or issues you may have.
        </Text>

        <View style={[styles.card, {backgroundColor: theme.card}]}>
          <TouchableOpacity style={styles.row} onPress={openPhone}>
            <Ionicons name="call" size={22} color={theme.button}/>
            <View style={{flex:1}}>
              <Text style={[styles.label, {color: theme.subtext}]}>Phone</Text>
              <Text style={[styles.value, {color: theme.text}]}>{sse.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subtext}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={openEmail}>
            <MaterialIcons name="email" size={22} color={theme.button}/>
            <View style={{flex:1}}>
              <Text style={[styles.label, {color: theme.subtext}]}>Email</Text>
              <Text style={[styles.value, {fontSize:13, color: theme.text}]}>{sse.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subtext}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.row, {borderBottomWidth: 0}]} onPress={openWhatsapp}>
            <FontAwesome name="whatsapp" size={22} color="#25D366"/>
            <View style={{flex:1}}>
              <Text style={[styles.label, {color: theme.subtext}]}>WhatsApp</Text>
              <Text style={[styles.value, {color: theme.text}]}>Chat on WhatsApp</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subtext}/>
          </TouchableOpacity>
        </View>
        <Text style={[styles.note, {color: theme.subtext}]}>
          Click on any of the options to contact directly
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {padding:20, paddingBottom:40},
  title: {fontSize:24, fontWeight:"bold", marginBottom:4, textAlign:"center"},
  subtitle: {fontSize:14, textAlign:"center", marginBottom:30},
  card: {borderRadius:12, padding:10,},
  row: {flexDirection:"row", alignItems:"center", gap:15, paddingVertical:18,
    paddingHorizontal:10, borderBottomWidth:1, borderColor:"#E5E7EB"
  },
  label: {fontSize:12},
  value: {fontSize:16, fontWeight:"600", marginTop:2},
  note: {fontSize:12, textAlign:"center", marginTop:30, fontStyle:"italic"},
  backBtn: {paddingLeft:5, alignSelf:"flex-start", marginBottom:10, paddingTop:-5}
});

