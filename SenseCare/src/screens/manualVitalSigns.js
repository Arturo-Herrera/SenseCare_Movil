import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function ManualVitalSignsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Take Vital Signs</Text>
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
