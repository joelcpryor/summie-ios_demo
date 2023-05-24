//  PROPS: submitWord(), resetWord(), wordToSubmit, btnOpacity.

import React, { useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

import { MetaContext } from "../App";

export default function WordSubmitView(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);
  const animationA = useRef(new Animated.Value(0)).current;
  const animationB = useRef(new Animated.Value(0)).current;
  const animationC = useRef(new Animated.Value(0)).current;
  const shakeText = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;
  const flashText = useRef(
    Animated.loop(
      Animated.timing(animationB, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    )
  ).current;
  const animateSuccess = useRef(
    Animated.timing(animationC, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;

  ////    ////    states      ////    ////
  ////    ////    useEffects      ////    ////
  useEffect(() => {
    if (props.wordToSubmit == "") {
      animationC.setValue(0);
    }
  }, [props.wordToSubmit]);

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "25%",
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    rowContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 5,
    },
    resetBtn: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 2,
      borderRadius: 16,
      opacity: props.btnOpacity,
    },
    wTSTxt: {
      color: animationA.interpolate({
        inputRange: [0, 0.2, 0.8, 1],
        outputRange: ["lightgreen", "red", "red", "lightgreen"],
      }),
      fontSize: animationC.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          consumeCtxt.fontSizes.header,
          consumeCtxt.fontSizes.biggest,
          consumeCtxt.fontSizes.header,
        ],
      }),
      letterSpacing: 10,
      transform: [
        {
          rotateZ: animationA.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: ["0deg", "-33deg", "0deg", "33deg", "0deg"],
          }),
        },
      ],
      opacity: animationC.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1, 0],
      }),
      marginLeft: 7,
    },
    checkingTxt: {
      color: "lightgrey",
      fontWeight: "300",
      fontStyle: "italic",
      fontSize: consumeCtxt.fontSizes.std,
      opacity: animationB.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0],
      }),
    },
  });

  ////      ////    component       ////    ////
  return (
    <View style={styles.parentContainer}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.resetBtn, { backgroundColor: "skyblue" }]}
          onPress={() => {
            if (props.btnOpacity == 1) {
              props.resetWord();
            }
          }}
        >
          <Text style={{ fontSize: consumeCtxt.fontSizes.std }}>Reset</Text>
        </TouchableOpacity>
        <Animated.Text style={styles.checkingTxt}>Checking ...</Animated.Text>
      </View>

      <Animated.Text style={styles.wTSTxt}>
        {props.wordToSubmit == "" ? `...` : `${props.wordToSubmit}`}
      </Animated.Text>

      <TouchableOpacity
        style={[styles.resetBtn, { backgroundColor: "gold" }]}
        onPress={async () => {
          if (props.btnOpacity == 1) {
            flashText.start();
            const result = await props.submitWord();
            flashText.stop();
            animationB.setValue(0);
            flashText.reset();
            if (result == "correct") {
              animateSuccess.start();
            } else if (result == "incorrect") {
              shakeText.start(() => {
                animationA.setValue(0);
              });
            }
          }
        }}
      >
        <Text
          style={{
            fontSize: consumeCtxt.fontSizes.subHeader,
            fontWeight: "bold",
          }}
        >
          SUBMIT
        </Text>
      </TouchableOpacity>
    </View>
  );
}
