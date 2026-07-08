import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { useStore } from "../store/useStore";

export default function Header() {
  const { isDark } = useStore();

  const theme = {
    bg: isDark ? "#111827" : "#F9FAFB",
    border: isDark ? "#374151" : "#E5E7EB",
  }
  return (
    <SafeAreaView style={{ backgroundColor: theme.bg }}>
      <View style={[styles.container, { backgroundColor: theme.bg, borderBottomColor: theme.border }]}>
        <Image 
          source={require("../../assets/images/techcrush-logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Image 
          source={require("../../assets/images/Tlogo.png")} 
          style={styles.tLogo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20,
    height: 60, 
    paddingBottom: 10, 
    borderBottomWidth: 1,
  },
  logo: {width: 120, height: 35},
  tLogo: {width: 32, height: 32}
});

