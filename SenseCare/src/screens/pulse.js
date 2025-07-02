import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function PulseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Real Time Pulse</Text>
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
