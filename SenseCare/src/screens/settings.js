//? Necessary imports
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";

//? Components imports
import Modal from "../components/modal";
import { AuthContext } from "../context/authContext";

//? Settings Screen
export default function SettingsScreen() {
  //* UseState to show or hide the modal
  const [showModal, setShowModal] = useState(false);

  //* This variable is used in case you want to log out
  const { signOut } = useContext(AuthContext);

  //* This function will help to log out and close the modal
  const handleLogout = () => {
    signOut();
    setShowModal(false);
  };

  //? Main component
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <Text style={styles.modalTitle}>¿Are you sure you want to logout?</Text>
        <View style={styles.modalActions}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.modalButton}
          >
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
            <Text style={styles.confirm}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  buttons: {
    width: 310,
    height: 58,
    backgroundColor: "#EBE7E0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#44749D",
  },
  content: {
    marginTop: 71,
    gap: 20,
  },
  logoutButton: {
    backgroundColor: "#FFC2C2",
    borderRadius: 20,
    width: 310,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#D92A2A",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  modalButton: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  cancel: {
    fontSize: 16,
    color: "#999",
    fontWeight: "bold",
  },
  confirm: {
    fontSize: 16,
    color: "#D92A2A",
    fontWeight: "bold",
  },
});
