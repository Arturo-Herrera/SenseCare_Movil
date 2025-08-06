import { useState, useContext, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AlertCard from "../components/alertCard";
import { AuthContext } from "../context/authContext";

export default function AlertsScreen() {
  const { user } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const fetchAlerts = async () => {
        try {
          const res = await fetch(
            `http://192.168.1.72:5221/api/Alerts/getByPatient/${user.id}`
          );

          if (!res.ok) throw new Error("Network response was not ok");

          const jsonResponse = await res.json();
          console.log("Respuesta completa:", jsonResponse);

          if (isMounted) {
            setAlerts(jsonResponse);
            setError(null);
          }
        } catch (err) {
          console.error(err);
          isMounted && setError("Failed loading alerts");
        } finally {
          isMounted && setLoading(false);
        }
      };

      fetchAlerts();
      const interval = setInterval(fetchAlerts, 10000);

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }, [user])
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) {
      return `${diffMins} mins ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Alerts</Text>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#44749D"
          style={{ marginTop: 20 }}
        />
      )}

      {error && !loading && (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            let type = item.idTipoAlerta === "SOS" ? "sos" : "warning";
            const formattedDate = formatDate(item.fecha);

            return (
              <AlertCard
                type={type}
                signo={item.signoAfectado}
                fecha={formattedDate}
              />
            );
          }}
          contentContainerStyle={{ paddingVertical: 16 }}
          style={styles.flatList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 60,
    fontSize: 40,
    fontWeight: "bold",
    color: "#44749D",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flexGrow: 1,
    paddingHorizontal: 10,
    marginBottom: 70,
  },
});
