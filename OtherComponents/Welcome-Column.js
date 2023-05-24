import React, { useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet, Animated, Easing, Button } from "react-native";

import { MetaContext } from "../App";

export default function Column(props) {
  ////    ////    inits       ////    ////
  const animationA = useRef(new Animated.Value(0)).current;
  const animateBoxes = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: false,
      easing: Easing.bounce,
    })
  ).current;
  const consumeCtxt = useContext(MetaContext);

  ////    ////    functions       ////    ////
  const checkJustification = () => {
    if (
      props.color == "green" ||
      props.color == "blue" ||
      props.color == "violet"
    ) {
      return styles.floatUp;
    }
  };

  const checkFontSize = () => {
    if (props.sqDim >= 70) {
      return { fontSize: 48, fontWeight: "bold" };
    } else {
      return { fontSize: 24 };
    }
  };

  ////    ////    useEffects      ////    ////
  useEffect(() => {
    animateBoxes.start();
  }, []);

  ////      ////    styles      ////    ////
  const styles = StyleSheet.create({
    colContainer: {
      height: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [props.colHeight, props.sqDim],
      }),
      width: props.sqDim,
    },
    boxContainer: {
      height: props.sqDim,
      width: props.sqDim,
      backgroundColor: consumeCtxt.colourScheme[props.color],
      borderWidth: 2,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    floatUp: {
      justifyContent: "flex-end",
    },
  });
  return (
    <Animated.View style={[styles.colContainer, checkJustification()]}>
      <Animated.View style={styles.boxContainer}>
        <Text style={checkFontSize()}>{props.letter}</Text>
      </Animated.View>
    </Animated.View>
  );
}
