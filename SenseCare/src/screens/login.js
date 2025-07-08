//? Necessary imports
import { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

//? Necessary component import
import { AuthContext } from "../context/authContext";

//? Login SCreen
//! This screen is provisional, we're gonna make it as attractive as posible
export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");

  const handle = async () => {
    try { setErr(""); await signIn(email, pass); }
    catch (e) { setErr(e.message); }
  };

  return (
    <View style={styles.box}>
      <TextInput placeholder="Email" style={styles.inp} value={email}
        autoCapitalize="none" onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.inp} value={pass}
        secureTextEntry onChangeText={setPass} />
      {err ? <Text style={styles.error}>{err}</Text> : null}
      <Button title="Login" onPress={handle} />
    </View>
  );
}
const styles = StyleSheet.create({
  box:{ flex:1, justifyContent:"center", padding:20 },
  inp:{ borderWidth:1, borderColor:"#ccc", marginBottom:12, padding:10 },
  error:{ color:"red", marginBottom:8 },
});
