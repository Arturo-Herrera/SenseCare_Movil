//Necessary imports to create a custom bottom tab bar
import { useEffect, useRef } from "react";
import {
  View,
  Pressable,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

//Icons and labels for the tabs
const tabs = [
  { name: "heartbeat", label: "Pulse" },
  { name: "exclamation-triangle", label: "Alert" },
  { name: "hand-holding-heart", label: "Take vital signs" },
  { name: "cog", label: "Settings" },
];

// Dimensions for the bottom tab bar
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MARGIN_H = 24;
const BAR_WIDTH = SCREEN_WIDTH - MARGIN_H * 2;
const BAR_HEIGHT = 76;
const SELECTOR_HEIGHT = 60;
const ITEM_WIDTH = BAR_WIDTH / tabs.length;

//BottomTabBar component
//* This component allows to create a bottom tab bar to navigate between different screens in the app
export default function BottomTabBar({ state, navigation }) {
  const { bottom } = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(state.index)).current;

  // Effect to animate the selector when the tab bar option changes
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index,
      stiffness: 160,
      damping: 18,
      mass: 0.9,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  // Render the bottom tab bar
  return (
    <View style={[styles.tabContainer, { bottom: bottom + 10 }]}>
      <Animated.View
        style={[
          styles.selector,
          {
            width: ITEM_WIDTH - 10,
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: tabs.map((_, i) => i),
                  outputRange: tabs.map((_, i) => i * ITEM_WIDTH + 5),
                }),
              },
            ],
          },
        ]}
      />

      {/* // Map through the routes and create a tab for each one */}
      {state.routes.map((route, index) => {
        const { name, label } = tabs[index];
        const focused = state.index === index;

        return (
          //Button for each tab
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
          >
            {/* // Icon and label for each tab */}
            <FontAwesome5
              name={name}
              size={20}
              solid={focused}
              color={focused ? "#FFFFFF" : "#E0E0E0"}
            />
            <Text style={[styles.label, focused && styles.labelFocused]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

//Styles for the bottom tab bar
const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#44749D",
    borderRadius: 30,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  tabButton: {
    width: ITEM_WIDTH,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 10,
    color: "#E0E0E0",
  },
  labelFocused: {
    color: "#ffffff",
  },
  selector: {
    position: "absolute",
    height: SELECTOR_HEIGHT,
    top: (BAR_HEIGHT - SELECTOR_HEIGHT) / 2,
    left: 0,
    borderRadius: 20,
    backgroundColor: "rgba(198, 212, 255, .35)",
  },
});
