import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";

import G5 from "./G5";
import G6 from "./G6";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function GameGrid(props) {
  ////    ////    initialisations     ////    ////
  const consumeCtxt = useContext(GameContext);
  const metaCtxt = useContext(MetaContext);
  const animationA = useRef(new Animated.Value(0)).current;

  ////    ////    states      ////    ////

  ////    ////    functions   ////    ////

  ////    ////    useEffects  ////    ////

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      width: "100%",
      height:
        metaCtxt.dimensions.height * 0.425 > 310
          ? metaCtxt.dimensions.height * 0.425
          : 310,
      maxWidth:
        metaCtxt.dimensions.height * 0.425 > 310
          ? metaCtxt.dimensions.height * 0.43
          : 310,
      justifyContent: "space-evenly",
      transform: [
        {
          rotateX: animationA.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "30deg", "0deg"],
          }),
        },
        {
          rotateY: animationA.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "30deg", "0deg"],
          }),
        },
      ],
    },
  });

  ////    ////    component   ////    ////

  return (
    <Animated.View style={styles.parentContainer}>
      {props.diff === "break_my_brain" ? <G6 /> : <G5 />}
    </Animated.View>
  );
}
