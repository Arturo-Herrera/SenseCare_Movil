//Necessary imports
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";

//Components imports
import AlertCard from "../components/alertCard";

// AlertsScreen component
//* This component fetches and shows the alerts from the API
export default function AlertsScreen() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {

        //! This URL to the api has to send the watch ID
        const res = await fetch("https://apiURL.com/api/alerts");
        const data = await res.json();
        setAlerts(data);
      } catch {
        setError("Failed loading alerts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <AlertCard name={item._id} description={item.description} />
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 60,
    fontSize: 40,
    fontWeight: "bold",
    color: "#44749D",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
