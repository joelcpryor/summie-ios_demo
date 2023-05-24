import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import BonusDisplayMain from "./BonusDisplayMain";
import BonusDisplayFixed from "./BonusDisplayFixed";
import BonusDisplaySettings from "./BonusDisplaySettings";
import BonusDisplaySocials from "./BonusDisplaySocials";

export default function BonusDisplay(props) {
  ////    ////    states    ////    ////
  const [index, setIndex] = useState(null);

  ////    ////    styles    ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      width: "96%",
      height: 235,
      alignItems: "center",
      justifyContent: "space-evenly",
      borderWidth: 1,
      padding: 5,
      backgroundColor: "whitesmoke",
      borderRadius: 8,
    },
  });

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    try {
      const rand = Math.floor(Math.random() * 5);
      setIndex(rand);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.parentContainer}>
      {index === 0 ? (
        <BonusDisplayFixed />
      ) : index === 1 ? (
        <BonusDisplaySettings />
      ) : index === 2 ? (
        <BonusDisplaySocials />
      ) : (
        <BonusDisplayMain />
      )}
    </View>
  );
}
