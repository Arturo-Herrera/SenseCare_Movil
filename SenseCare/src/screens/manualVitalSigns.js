//? Necessary imports
import { SafeAreaView, Text, StyleSheet, View, Alert } from "react-native";
import { useState, useContext } from "react";

//? Checkup button component import
import StartCheckupButton from "../components/buttonTake";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";

import { AuthContext } from "../context/authContext";

export default function ManualVitalSignsScreen() {
  const [bpm, setBpm] = useState(null);
  const [temp, setTemp] = useState(null);
  const [spo2, setSpo2] = useState(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const [resetBars, setResetBars] = useState(false);
  const { user } = useContext(AuthContext);

  const handleStartMeasurement = async () => {
    setResetBars(true); // Forzar el reset visual
    setBpm(null);
    setTemp(null);
    setSpo2(null);
    setIsMeasuring(true);

    // Volver a "false" en el siguiente ciclo de render
    setTimeout(() => setResetBars(false), 0);

    try {
      // 1. Enviar Trigger al backend
      const triggerResponse = await fetch(
        "http://192.168.1.72:5221/api/TriggerDevice/trigger",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user.id),
        }
      );

      if (!triggerResponse.ok) {
        throw new Error("Failed sending signal");
      }

      console.log("Signal has been send");

      // 2. Esperar 7 segundos
      await new Promise((resolve) => setTimeout(resolve, 7000));

      // 3. Obtener signos vitales desde la API
      const vitalSignsResponse = await fetch(
        `http://192.168.1.72:5221/api/Patient/signsByCaregiver/${user.id}`
      );

      if (!vitalSignsResponse.ok) {
        throw new Error("Failed getting vital signs");
      }

      const vitalSignsData = await vitalSignsResponse.json();

      console.log("Received data:", vitalSignsData);

      const vitalSigns = vitalSignsData.data;

      if (vitalSigns) {
        const lastPulseValue = vitalSigns.pulso[vitalSigns.pulso.length - 1];

        setBpm(lastPulseValue);
        setTemp(vitalSigns.temperatura);
        setSpo2(vitalSigns.oxigeno);
        setResetCounter((prev) => prev + 1);
      } else {
        Alert.alert("Error", "No vital signs data found.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsMeasuring(false);
    }
  };

  const getBarWidth = (value, min, max) => {
    if (value == null) return "0%";
    const clamped = Math.min(Math.max(value, min), max);
    const percent = ((clamped - min) / (max - min)) * 100;
    return `${percent}%`;
  };

  const getBarColor = (value, type) => {
    if (value == null) return "#C6D4E1"; // Gris por defecto si no hay valor

    switch (type) {
      case "bpm":
        if (value < 60 || value > 120) return "#F42B15"; // Crítico
        if (value > 100) return "#FBC02D";
        return "#5AC87B"; // Normal
      case "temp":
        if (value < 36.1 || value > 39.5) return "#F42B15"; // Crítico
        if (value > 37.2) return "#FBC02D"; // Crítico
        return "#5AC87B"; // Normal
      case "spo2":
        if (value < 90) return "#F42B15"; // Bajo
        if (value < 94) return "#FBC02D"; // Bajo
        return "#5AC87B"; // Normal
      default:
        return "#C6D4E1"; // Fallback
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Take Vital Signs</Text>
      <StartCheckupButton
        requestVitalSigns={handleStartMeasurement} // Ya no usamos la simulación
        onFinished={() => {}} // Eliminamos este callback
        onStartRequest={() => {}}
      />

      <View style={styles.dataContent}>
        <View style={styles.group}>
          {/* BPM */}
          <Text style={styles.cardText}>Heart rate:</Text>
          <View style={styles.card}>
            <MaterialIcons name="monitor-heart" size={35} color="#44749D" />
            <View style={styles.barContainer}>
              <View
                key={`bpm-bar-${resetCounter}-${
                  resetBars ? "reset" : "normal"
                }`}
                style={[
                  styles.bar,
                  resetBars
                    ? { width: "0%", backgroundColor: "#C6D4E1" }
                    : {
                        width: isMeasuring ? "0%" : getBarWidth(bpm, 50, 120),
                        backgroundColor: isMeasuring
                          ? "#C6D4E1"
                          : getBarColor(bpm, "bpm"),
                      },
                ]}
              />
              <Text style={styles.value}>
                {bpm != null ? `${bpm} BPM` : "-- BPM"}
              </Text>
            </View>
          </View>

          {/* TEMP */}
          <Text style={styles.cardText}>Temperature:</Text>
          <View style={styles.card}>
            <FontAwesome6 name="temperature-half" size={35} color="#44749D" />
            <View style={styles.barContainer}>
              <View
                key={`temp-bar-${resetCounter}-${
                  resetBars ? "reset" : "normal"
                }`}
                style={[
                  styles.bar,
                  resetBars
                    ? { width: "0%", backgroundColor: "#C6D4E1" }
                    : {
                        width: isMeasuring ? "0%" : getBarWidth(temp, 35, 40),
                        backgroundColor: isMeasuring
                          ? "#C6D4E1"
                          : getBarColor(temp, "temp"),
                      },
                ]}
              />
              <Text style={styles.value}>
                {temp != null ? `${temp.toFixed(1)} °C` : "-- °C"}
              </Text>
            </View>
          </View>

          {/* SPO2 */}
          <Text style={styles.cardText}>Oxygen:</Text>
          <View style={styles.card}>
            <MaterialIcons name="water-drop" size={35} color="#44749D" />
            <View style={styles.barContainer}>
              <View
                key={`spo2-bar-${resetCounter}-${
                  resetBars ? "reset" : "normal"
                }`}
                style={[
                  styles.bar,
                  resetBars
                    ? { width: "0%", backgroundColor: "#C6D4E1" }
                    : {
                        width: isMeasuring ? "0%" : getBarWidth(spo2, 80, 100),
                        backgroundColor: isMeasuring
                          ? "#C6D4E1"
                          : getBarColor(spo2, "spo2"),
                      },
                ]}
              />
              <Text style={styles.value}>
                {spo2 != null ? `${spo2} %` : "-- %"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    marginTop: 60,
    fontSize: 32,
    fontWeight: "bold",
    color: "#44749D",
  },
  dataContent: {
    marginTop: 88,
    gap: 15,
  },
  group: {
    gap: 10,
  },
  cardText: {
    color: "#44749D",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    width: 310,
    height: 58,
    backgroundColor: "#EBE7E0",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    marginBottom: 15,
  },
  barContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  bar: {
    flex: 1,
    height: 16,
    backgroundColor: "#C6D4E1",
    borderRadius: 30,
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#BDB8AD",
    minWidth: 60,
    textAlign: "right",
    paddingRight: 5,
  },
});
