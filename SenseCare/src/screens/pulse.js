import { useState, useContext, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { FontAwesome5 } from "@expo/vector-icons";

export default function PulseScreen() {
  const { user } = useContext(AuthContext);
  const [signs, setSigns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (!user || !user.id) return;

      let isMounted = true;

      const fetchVitalSigns = async () => {
        try {
          const res = await fetch(
            `http://192.168.1.72:5221/api/patient/signsByCaregiver/${user.id}`
          );

          const json = await res.json();
          console.log(json);

          if (json.status !== 0) {
            isMounted && setError(json.message);
          } else if (isMounted) {
            setSigns(Array.isArray(json.data) ? json.data[0] : json.data);
            setError(null);
          }
        } catch (error) {
          isMounted && setError("Error loading vital signs");
          console.log(error);
        } finally {
          isMounted && setLoading(false);
        }
      };

      fetchVitalSigns();
      const interval = setInterval(fetchVitalSigns, 10000);

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }, [user])
  );

  const getPulseStatus = (pulse) => {
    if (pulse < 60 || pulse > 100)
      return { label: "Critical", color: "#F42B15" };
    if (pulse < 70 || pulse > 90) return { label: "Medium", color: "#FBC02D" };
    return { label: "Normal", color: "#5AC87B" };
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Real‑Time Pulse</Text>
      <Image
        source={require("../../assets/SenseCareIcon.png")}
        style={styles.pulseWave}
        resizeMode="contain"
      />

      {signs && (
        <View style={styles.currentPulseContainer}>
          <View style={styles.bpmView}>
            <Text
              style={[
                styles.currentPulse,
                { color: getPulseStatus(signs.pulso.at(-1)).color },
              ]}
            >
              {Array.isArray(signs.pulso) ? signs.pulso.at(-1) : signs.pulso}
            </Text>
            <Text
              style={[
                styles.bpmStatusText,
                { color: getPulseStatus(signs.pulso.at(-1)).color },
              ]}
            >
              BPM
            </Text>
          </View>

          <View
            style={[
              styles.statusBlock,
              { backgroundColor: getPulseStatus(signs.pulso.at(-1)).color },
            ]}
          >
            <FontAwesome5
              name="exclamation-triangle"
              size={23}
              color="#ffffff"
            />

            <Text style={styles.statusText}>
              {getPulseStatus(signs.pulso.at(-1)).label}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.signsContainer}>
        <Text style={styles.signsTitle}>Vital Signs</Text>
        <View style={styles.signsView}>
          {loading ? (
            <ActivityIndicator size="small" color="#44749D" />
          ) : error ? (
            <Text
              style={[styles.signsText, { color: "red", textAlign: "center" }]}
            >
              {error}
            </Text>
          ) : !signs ? (
            <Text
              style={[styles.signsText, { color: "#666", textAlign: "center" }]}
            >
              No vital signs available
            </Text>
          ) : (
            <>
              <Text style={styles.signsText}>
                {Array.isArray(signs.pulso) ? signs.pulso.at(-1) : signs.pulso}{" "}
                BPM
              </Text>
              <Text style={styles.signsText}>
                {Number(signs.temperatura).toFixed(1)} °C
              </Text>{" "}
              <Text style={styles.signsText}>{signs.oxigeno} %</Text>
            </>
          )}
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
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#44749D",
    marginBottom: 20,
    marginTop: 60,
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
  },
  pulseWave: {
    width: 276,
    height: 276,
  },
  signsView: {
    backgroundColor: "#EBE7E0",
    width: 351,
    minHeight: 55,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  signsText: {
    color: "#44749D",
    fontSize: 20,
    fontWeight: "bold",
  },
  signsContainer: {
    gap: 20,
    position: "absolute",
    bottom: 170,
    alignItems: "center",
  },
  signsTitle: {
    color: "#44749D",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  currentPulseContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 27,
    marginBottom: 30,
  },
  currentPulse: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#44749D",
  },
  statusBlock: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 171,
    height: 64,
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  bpmView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "baseline",
  },
  bpmStatusText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
