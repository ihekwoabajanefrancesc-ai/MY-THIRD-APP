import { TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function PasswordInput({value, onChangeText, placeholder}) {
  const [secure, setSecure] = useState(true);
  return (
    <View style={{flexDirection:"row", borderWidth:1, borderRadius:8, paddingHorizontal:12}}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        style={{flex:1, padding:12}}
      />
      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Ionicons name={secure ? "eye-off" : "eye"} size={20}/>
      </TouchableOpacity>
    </View>
  );
}

