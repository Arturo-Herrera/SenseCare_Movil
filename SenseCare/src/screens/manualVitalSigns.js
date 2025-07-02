//? Necessary imports
import { SafeAreaView, Text, StyleSheet } from "react-native";

//? Checkup button component import
import StartCheckupButton from "../components/buttonTake";

//? Manual Vital Sign Screen
export default function ManualVitalSignsScreen() {
  const requestVitalSigns = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ bpm: 72, spo2: 98, temp: 36.8 }), 5000)
    );

  const handleFinished = (data) => {
    console.log("Vital Signs:", data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Take Vital Signs</Text>
      <StartCheckupButton
        requestVitalSigns={requestVitalSigns}
        onFinished={handleFinished}
      />
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
});
