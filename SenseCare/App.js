//Dependencies imports
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//Screens imports
import PulseScreen from './src/screens/pulse';
import AlertsScreen from './src/screens/alerts';
import ManualVitalSignsScreen from './src/screens/manualVitalSigns';
import SettingsScreen from './src/screens/settings';

//Navigation bar import
import BottomTabBar from './src/components/bottomTabBar';

//Creation of the bottom tab navigator
const Tab = createBottomTabNavigator();


//Main App component
//* This component sets up the navigation container and the bottom tab navigator
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} /> }>
        <Tab.Screen name= "PulseScreen" component={PulseScreen}/>
        <Tab.Screen name= "AlertsScreen" component={AlertsScreen}/>
        <Tab.Screen name= "ManualVitalSignsScreen" component={ManualVitalSignsScreen}/>
        <Tab.Screen name= "SettingsScreen" component={SettingsScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
