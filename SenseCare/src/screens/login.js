//? Necessary imports
import { useState, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/authContext";

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");

  const handle = async () => {
    try { setErr(""); await signIn(email, pass); }
    catch (e) { setErr(e.message); }
  };

  /* ---------- RENDER ---------- */
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* ---------- HEADER EN FONDO ---------- */}
      <LinearGradient
        colors={["#ffffff", "#C6D4E1"]}
        style={styles.headerBg}
      >
        <Image
          source={require("../../assets/SenseCareIcon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brand}>SenseCare</Text>
      </LinearGradient>

      {/* ---------- CARD DE CONTENIDO ---------- */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back!</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#C4C4C4"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#C4C4C4"
          style={styles.input}
          secureTextEntry
          value={pass}
          onChangeText={setPass}
        />

        {err ? <Text style={styles.error}>{err}</Text> : null}

        <TouchableOpacity style={styles.btn} onPress={handle}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.linkSmall}>You forgot your password?</Text>
        <Text style={styles.linkBig}>Contact your company</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------- STYLES ---------- */
const HEADER_HEIGHT = 300;               // alto del degradado

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  /* Header ocupa todo el ancho, está detrás de la card */
  headerBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    alignItems: "center",
    paddingTop: 60,
  },
  logo: { width: 164, height: 95, marginBottom: 8, marginTop: 10 },
  brand: { fontSize: 32, fontWeight: "bold", color: "#44749D" },

  /* Tarjeta que “sube” desde abajo */
  card: {
    flex: 1,
    marginTop: HEADER_HEIGHT - 60,      // solapa 60 px sobre el header
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 32,
    zIndex: 2,
    /* SOMBRA (iOS / Android) */
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },

  title: { fontSize: 36, fontWeight: "bold", color: "#44749D", marginBottom: 60, marginTop: 20,textAlign: "center" },
  input: {
    width: 327,
    height: 61,
    backgroundColor: "#EFEFEF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#44749D"
  },
  error: { color: "red", marginBottom: 12 },
  btn: {
    backgroundColor: "#44749D",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginBottom: 28,
    width: 327,
    height: 61,
    marginTop: 58
  },
  btnTxt: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  linkSmall: { fontSize: 16, color: "#44749D", textAlign: "regular" },
  linkBig: { fontSize: 20, color: "#44749D", fontWeight: "bold", textAlign: "center" },
});
