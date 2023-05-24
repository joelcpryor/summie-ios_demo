//  PROPS: height, width, opacity, color, aI, jC.

import React from "react";
import { View, StyleSheet } from "react-native";

export default function SpacedContainer(props) {
  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      width: props.width,
      maxWidth: 700,
      minHeight: props.height,
      maxHeight: 700,
      backgroundColor: props.color,
      opacity: props.opacity,
      alignItems: props.aI,
      justifyContent: props.jC,
      borderWidth: 1,
      borderRadius: 8,
      padding: 8,
    },
  });

  ////    ////    component   ////    ////
  return <View style={styles.parentContainer}>{props.children}</View>;
}
