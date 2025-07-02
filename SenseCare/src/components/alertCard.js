import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const alertType = {
  warning: { bg: "#FFE4B9", text: "#FF9D00" },
  sos: { bg: "#FFD4D4", text: "#F42B15" },
};

export default function AlertCard({ type, description }) {
  const {bg, text} = alertType[type?.toLowerCase()] ?? {
    bg: "#ccc",
    text: "#aaa",
  };
  return (
    <View style={[styles.cardContainer, { backgroundColor: bg }]}>
      <Text style={[styles.alertText, { color: text }]}>{description}</Text>
        <FontAwesome5
            name={type === "sos" ? "exclamation-triangle" : "exclamation-circle"}
            size={24}
            color={text}
            style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 302,
    height: 70,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
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
    textAlign: "center",
    marginRight: 10,
  },
  icon: {
    position: "absolute",
    right: 16,
    fontSize: 30,
  }

});
