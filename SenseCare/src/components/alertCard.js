import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const alertType = {
  warning: { bg: "#FFE4B9", text: "#FF9D00" },
  sos: { bg: "#FFD4D4", text: "#F42B15" },
};

export default function AlertCard({ type, signo, fecha }) {
  const { bg, text } = alertType[type?.toLowerCase()] ?? {
    bg: "#ccc",
    text: "#aaa",
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: bg }]}>
      <FontAwesome5
        name={type === "sos" ? "exclamation-triangle" : "exclamation-circle"}
        size={24}
        color={text}
        style={styles.iconLeft}
      />

      <Text style={[styles.alertText, { color: text }]}>{signo}</Text>

      <Text style={[styles.dateText, { color: text}]}>{fecha}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 320,
    height: 70,
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  alertText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  iconLeft: {
    marginRight: 12,
  },
});
