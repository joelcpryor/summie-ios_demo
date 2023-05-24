import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { MetaContext } from "../App";

export default function LetterEarned(props) {
  ////    ////    inits       ////    ////
  const animationA = useRef(new Animated.Value(0)).current;
  const animationB = useRef(new Animated.Value(0)).current;
  const letterDrop = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
      easing: Easing.bounce,
    })
  ).current;
  const letterShake = useRef(
    Animated.timing(animationB, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;
  const consumeCtxt = useContext(MetaContext);

  ////    ////    states      ////    ////

  ////      ////    useEffects      ////    ////
  useEffect(() => {
    if (props.animateWhich == props.color) {
      letterDrop.start();
    }
  }, [props.animateWhich]);

  useEffect(() => {
    try {
      if (props.animationComplete === true) {
        if (props.ascendStreak > 0) {
          letterShake.start();
        } else {
          for (var i in props.matches) {
            if (props.letter === i) {
              letterShake.start();
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [props.animationComplete]);

  ////      ////    styles      ////    ////

  return (
    <Animated.Text
      style={{
        fontSize: animationA.interpolate({
          inputRange: [0, 1],
          outputRange: [1, consumeCtxt.fontSizes.biggest],
        }),
        fontWeight: "bold",
        color: props.color,
        opacity: animationA.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            rotateZ: animationB.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: ["0deg", "-33deg", "0deg", "33deg", "0deg"],
            }),
          },
        ],
      }}
    >
      {props.letter}
    </Animated.Text>
  );
}
