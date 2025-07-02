//? Necessary imports
import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

//? Dimensions
const BTN_W = 236,
  BTN_H = 58;
const WATCH_W = 139,
  WATCH_H = 82;
const RADIUS_CLOSED = 20,
  RADIUS_OPEN = 30;

//? Checkup button component
//* This component is used to start a manual checkup of vital signs.
export default function StartCheckupButton({ requestVitalSigns, onFinished }) {
  const [phase, setPhase] = useState("default"); //! There are three phases: default, wait, and done
  const shape = useRef(new Animated.Value(0)).current;
  const blink = useRef(new Animated.Value(1)).current;

  //? Interpolations for animations
  const width = shape.interpolate({
    inputRange: [0, 1],
    outputRange: [BTN_W, WATCH_W],
  });
  const height = shape.interpolate({
    inputRange: [0, 1],
    outputRange: [BTN_H, WATCH_H],
  });
  const borderRadius = shape.interpolate({
    inputRange: [0, 1],
    outputRange: [RADIUS_CLOSED, RADIUS_OPEN],
  });
  const bgColor = shape.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(68,116,157,1)", "rgba(68,116,157,0)"],
  });
  const slideOut = shape.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -BTN_W * 0.55],
  });
  const contentOpacity = shape.interpolate({
    inputRange: [0, 0.25],
    outputRange: [1, 0],
  });
  const watchOpacityBase = shape.interpolate({
    inputRange: [0.6, 1],
    outputRange: [0, 1],
  });
  const watchOpacity = Animated.multiply(watchOpacityBase, blink);

  //? Flicker effect
  useEffect(() => {
    let loop;
    if (phase === "wait") {
      blink.setValue(1);
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(blink, {
            toValue: 0.2,
            duration: 400,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.timing(blink, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
        ])
      );
      loop.start();
    } else {
      loop?.stop();
      blink.setValue(1);
    }
    return () => loop?.stop();
  }, [phase, blink]);

  //? Handle button press
  //! This is used when the user presses the button to start the checkup
  //! It will animate the button, request the vital signs, and then animate it back to the default state.
  const handlePress = () => {
    if (phase === "default") {
      Animated.timing(shape, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }).start(() => setPhase("wait"));

      (requestVitalSigns?.() ?? Promise.resolve())
        .then((data) => {
          setPhase("done");
          Animated.timing(shape, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false,
          }).start();
          onFinished?.(data);
        })
        .catch((err) => {
          console.error("Failed getting vital signs", err);
          Animated.timing(shape, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false,
          }).start(() => setPhase("default"));
        });
    } else if (phase === "done") {
      setPhase("default");
    }
  };

  //* Decide label and icon based on phase
  const label = phase === "done" ? "Checkup Finished" : "Start checkup";
  const iconName = phase === "done" ? "check" : "heart";
  const disabled = phase === "wait";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.container,
          { width, height, borderRadius, backgroundColor: bgColor },
        ]}
      >
        {/* This is where the icon and label are decided */}
        <Animated.View
          style={[
            styles.left,
            { transform: [{ translateX: slideOut }], opacity: contentOpacity },
          ]}
        >
          <FontAwesome
            name={iconName}
            size={22}
            color="#fff"
            style={styles.icon}
          />
          <Animated.Text style={[styles.text, { opacity: contentOpacity }]}>
            {label}
          </Animated.Text>
        </Animated.View>

        {/* This is when the button becomes into a clock */}
        <Animated.View style={[styles.watchWrapper, { opacity: watchOpacity }]}>
          <Image
            source={require("../../assets/watch.png")}
            style={styles.watch}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", overflow: "hidden", marginTop: 41 },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  icon: { marginRight: 13 },
  text: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  watchWrapper: { alignItems: "center" },
  watch: { width: WATCH_W, height: WATCH_H },
});
