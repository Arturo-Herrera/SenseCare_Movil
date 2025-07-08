//? Necessary imports
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//? Components import
import { AuthProvider, AuthContext } from "./src/context/authContext";
import AppTabs from "./src/components/appTabs";
import LoginScreen from "./src/screens/login";

const Stack = createNativeStackNavigator();

//*We create the main navigator whether the app will redirect the user to Login Screen or the Main Screen
function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // aquí pondrás tu splash animado

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        {user ? (
          // --- Sesión iniciada → pestañas ---
          <Stack.Screen name="Main" component={AppTabs} />
        ) : (
          // --- Sin sesión → login ---
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
