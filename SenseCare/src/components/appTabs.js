//! We moved the entire app navigation from app.js to this file to be able to make the login

//? Necessary imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//? Components imports
import BottomTabBar from "../components/bottomTabBar";
import PulseScreen from "../screens/pulse";
import AlertsScreen from "../screens/alerts";
import ManualVitalSignsScreen from "../screens/manualVitalSigns";
import SettingsScreen from "../screens/settings";

const Tab = createBottomTabNavigator();

//? Main component to import in app.js
export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="PulseScreen" component={PulseScreen} />
      <Tab.Screen name="AlertsScreen" component={AlertsScreen} />
      <Tab.Screen name="ManualVitalSignsScreen" component={ManualVitalSignsScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
