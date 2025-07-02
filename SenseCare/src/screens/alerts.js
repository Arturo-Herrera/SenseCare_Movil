import { SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import AlertCard from "../components/alertCard";

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      <ScrollView>
      </ScrollView>
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
    fontSize: 40,
    fontWeight: "bold",
    color: "#44749D",
  },
});
