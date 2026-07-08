import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ActivityIndicator, Alert, ScrollView, useColorScheme } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../../src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [course, setCourse] = useState("");

  const isDark = colorScheme === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  const days = Array.from({length: 31}, (_, i) => i + 1);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
  const countryCodes = ["+234", "+1", "+44", "+233", "+254", "+27", "+20", "+91", "+81", "+61", "+49", "+33", "+39", "+7", "+55", "+34", "+46", "+31", "+41", "+82"];

  const handleSignup = async () => {
    if (!firstName || !surname || !email || !password || !confirmPassword || !day || !month || !year || !gender || !phoneNumber || !course) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    const dateOfBirth = `${year}-${String(months.indexOf(month)+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const fullPhone = `${countryCode}${phoneNumber}`;

    setLoading(true);
    const { error } = await supabase.auth.signUp({ 
      email: email.trim(), 
      password,
      options: {
        emailRedirectTo: "techcrush://auth/callback",
        data: {
          first_name: firstName,
          surname: surname,
          date_of_birth: dateOfBirth,
          gender: gender,
          phone: fullPhone,
          course: course
        }
      }
    });
    setLoading(false);
    if (error) {
      Alert.alert("Signup Failed, Try Again", error.message);
    } else {
      Alert.alert("Success", "Check your email to verify your account. Then come back to login.",[
        {text:"OK", onPress: () => router.push("/auth/sign-in")}
      ]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.bg}]}>
      <Image 
        source={require("../../assets/images/Splash.png")} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, {color: theme.text}]}>Create Account</Text>
      <Text style={[styles.subtitle, {color: theme.subtext}]}>Join TechCrush today</Text>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.label, {color: theme.text}]}>Name</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput, {backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text}]}
            placeholder="Surname"
            placeholderTextColor={theme.placeholder}
            value={surname}
            onChangeText={setSurname}
          />
          <TextInput
            style={[styles.input, styles.halfInput, {backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text}]}
            placeholder="Other Names"
            placeholderTextColor={theme.placeholder}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <Text style={[styles.label, {color: theme.text}]}>Email</Text>
        <TextInput
          style={[styles.input, {backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text}]}
          placeholder="Email address"
          placeholderTextColor={theme.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={[styles.label, {color: theme.text}]}>Password</Text>
        <View style={[styles.passwordContainer, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
          <TextInput
            style={[styles.passwordInput, {color: theme.text}]}
            placeholder="Min 6 characters"
            placeholderTextColor={theme.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={"#9CA3AF"}/>
          </TouchableOpacity>
        </View>
        <Text style={[styles.label, {marginTop: 2, color: theme.text}]}>Confirm Password</Text>
        <View style={[styles.passwordContainer, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
          <TextInput
            style={[styles.passwordInput, {color: theme.text}]}
            placeholder="Re-enter password"
            placeholderTextColor={theme.placeholder}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color={"#9CA3AF"}/>
          </TouchableOpacity>
        </View>
        <Text style={[styles.label, {marginTop:1, color: theme.text}]}>Date of Birth</Text>
        <View style={styles.row}>
          <View style={[styles.pickerContainer, styles.dayInput, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
            <Picker selectedValue={day} onValueChange={setDay} style={{color: theme.subtext}}>
              <Picker.Item label="Day" value=""/>
              {days.map(d => <Picker.Item key={d} label={d.toString()} value={d.toString()}/>)}
            </Picker>
          </View>
          <View style={[styles.pickerContainer, styles.monthInput, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
            <Picker selectedValue={month} onValueChange={setMonth} style={{color: theme.subtext}}>
              <Picker.Item label="Month" value=""/>
              {months.map((m, i) => <Picker.Item key={m} label={m} value={monthValues[i]}/>)}
            </Picker>
          </View>
          <View style={[styles.pickerContainer, styles.yearInput, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
            <Picker selectedValue={year} onValueChange={setYear} style={{color: theme.subtext}}>
              <Picker.Item label="Year" value=""/>
              {years.map(y => <Picker.Item key={y} label={y.toString()} value={y.toString()}/>)}
            </Picker>
          </View>
        </View>
        <Text style={[styles.label, {color: theme.text}]}>Gender</Text>
        <View style={[styles.pickerContainer, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
          <Picker selectedValue={gender} onValueChange={setGender} style={{color: theme.subtext}}>
            <Picker.Item label="Select your gender" value=""/>
            <Picker.Item label="Male" value="male"/>
            <Picker.Item label="Female" value="female"/>
            <Picker.Item label="Prefer not to say" value="prefer_not_to_say"/>
          </Picker>
        </View>
        <Text style={[styles.label, {color: theme.text}]}>Phone Number</Text>
        <View style={styles.row}>
          <View style={[styles.pickerContainer, styles.smallInput, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
            <Picker selectedValue={countryCode} onValueChange={setCountryCode} style={{color: theme.subtext}}>
              {countryCodes.map(c => <Picker.Item key={c} label={c} value={c}/>)}
            </Picker>
          </View>
          <TextInput
            style={[styles.input, styles.largeInput, {backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text}]}
            placeholder="8012345678"
            placeholderTextColor={theme.placeholder}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        <Text style={[styles.label, {color: theme.text}]}>Course</Text>
        <View style={[styles.pickerContainer, {backgroundColor: theme.inputBg, borderColor: theme.border}]}>
          <Picker selectedValue={course} onValueChange={setCourse} style={{color: theme.subtext}}>
            <Picker.Item label="Select your course" value=""/>
            <Picker.Item label="Mobile App Development" value="mobile_app_development"/>
            <Picker.Item label="Data Analysis" value="data_analysis"/>
            <Picker.Item label="Cloud Computing" value="cloud_computing"/>
            <Picker.Item label="Cybersecurity" value="cybersecurity"/>
            <Picker.Item label="Ethical Hacking" value="ethical_hacking"/>
            <Picker.Item label="Virtual Assistant" value="virtual_assistant"/>
            <Picker.Item label="Data Science" value="data_science"/>
            <Picker.Item label="Web Development" value="web_development"/>
            <Picker.Item label="Graphic Design" value="graphic_design"/>
          </Picker>
        </View>
        <TouchableOpacity style={[styles.button, {marginTop:35, backgroundColor: theme.button}]} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: theme.subtext}]}>Already have an account? </Text>
          <Link href="/auth/sign-in" asChild>
            <TouchableOpacity>
              <Text style={[styles.link, {color: theme.button}]}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
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
  content: {padding:24, paddingBottom:30, marginTop:-40},
  logo: {width:130, height:130, alignSelf:"center", marginTop:15},
  title: {fontSize:22, fontWeight:"bold", textAlign:"center", marginTop:-15},
  subtitle: {fontSize:14, textAlign:"center", marginBottom:10},
  label: {fontSize:14, fontWeight:"600", marginBottom:8, marginTop:17},
  input: {padding:10, borderRadius:10, marginBottom:-10, borderWidth:1, height:45},
  passwordContainer: {flexDirection:"row", alignItems: "center", borderRadius:10, marginBottom:10, borderWidth:1},
  passwordInput: {flex: 1, padding:10, height:45},
  eyeButton: {paddingHorizontal:15},
  pickerContainer: {borderRadius:10, marginBottom:-5, borderWidth:1, height:45, overflow:"hidden", justifyContent:"center"},
  row: {flexDirection:"row", justifyContent:"space-between", gap:7, alignItems:"center"},
  halfInput: {flex: 1},
  dayInput: {width: 90},
  monthInput: {flex:2},
  yearInput: {width:105},
  smallInput: {width:102},
  largeInput: {flex: 1},
  button: {padding:10, borderRadius:10, alignItems:"center", marginTop:10},
  buttonText: {color:"#fff", fontSize:16, fontWeight:"bold"},
  footer: {flexDirection:"row", justifyContent:"center", marginTop:20, gap:5},
  footerText: {},
  link: {fontWeight:"bold"},
});

