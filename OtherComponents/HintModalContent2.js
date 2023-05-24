import React, { useState, useContext } from "react";
import { View, Text, Modal, StyleSheet, Image, Button } from "react-native";

import { MetaContext } from "../App";
import { GameContext } from "../GameComponents/SummieBoard";

export default function HintModalContent2(props) {
  ////    ////    inits       ////    ////
  const consumeCtxtMeta = useContext(MetaContext);
  const consumeCtxt = useContext(GameContext);

  ////      ////        styles      ////    ////
  const styles = StyleSheet.create({
    header: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: "gold",
    },
    stdText: {
      fontSize: consumeCtxtMeta.fontSizes.std,
      textAlign: "center",
    },
    subHeaderTxt: {
      fontSize: consumeCtxtMeta.fontSizes.subHeader,
      textAlign: "center",
    },
    headerTxt: {
      fontSize: consumeCtxtMeta.fontSizes.header,
      textAlign: "center",
    },
    exampleTile: {
      height: 60,
      width: 60,
      backgroundColor: "lightblue",
      borderWidth: 2,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    exampleRow: {
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 4,
      borderRadius: 4,
    },
  });

  ////      ////        component       ////    ////
  return (
    <>
      <Text style={[styles.subHeaderTxt, { fontWeight: "bold" }]}>
        Work smarter, not harder!
      </Text>

      <Image
        source={require("../assets/unique_combo_demo.png")}
        resizeMode="contain"
        style={{ height: 300, width: 300, borderWidth: 1 }}
      />
      <Text style={styles.subHeaderTxt}>
        <Text style={{ fontWeight: "bold" }}>REMEMBER: </Text>
        Each yellow row and column contains a{" "}
        <Text style={{ fontWeight: "bold" }}>unique</Text> combination of
        numbers.
      </Text>
      <Text style={styles.subHeaderTxt}>
        Therefore, if a number between 1 and 8 appears only once below the grid,
        then you know it <Text style={{ fontWeight: "bold" }}>must</Text> belong
        in a yellow row or column!
      </Text>

      <Button
        title="EXIT"
        onPress={() => {
          consumeCtxt.toggleHintModal();
          setTimeout(() => {
            props.toggleIndex(0);
          }, 1000);
        }}
      />
    </>
  );
}
