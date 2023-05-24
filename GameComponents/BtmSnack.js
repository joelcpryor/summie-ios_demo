import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import BtmCell from "./BtmCell";
import { GameContext } from "./SummieBoard";

export default function BtmSnack(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
      opacity: props.gameState === "active" ? 1 : 0,
    },
    rowContainer: {
      height: "25%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });

  return (
    <View style={styles.parentContainer}>
      {consumeCtxt.diff === "snack0" || consumeCtxt.diff === "snack1" ? (
        <>
          <View style={styles.rowContainer}>
            <BtmCell id="b0" />
            <BtmCell id="b1" />
            <BtmCell id="b2" />
            <BtmCell id="b3" />
            <BtmCell id="b4" />
            <BtmCell id="b5" />
          </View>
        </>
      ) : consumeCtxt.diff === "snack2" ? (
        <>
          <View style={styles.rowContainer}>
            <BtmCell id="b0" />
            <BtmCell id="b1" />
            <BtmCell id="b2" />
            <BtmCell id="b3" />
          </View>
          <View style={styles.rowContainer}>
            <BtmCell id="b4" />
            <BtmCell id="b5" />
            <BtmCell id="b6" />
          </View>
        </>
      ) : consumeCtxt.diff === "snack3" ? (
        <>
          <View style={styles.rowContainer}>
            <BtmCell id="b0" />
            <BtmCell id="b1" />
            <BtmCell id="b2" />
            <BtmCell id="b3" />
          </View>
          <View style={styles.rowContainer}>
            <BtmCell id="b4" />
            <BtmCell id="b5" />
            <BtmCell id="b6" />
            <BtmCell id="b7" />
          </View>
        </>
      ) : (
        <>
          <View style={styles.rowContainer}>
            <BtmCell id="b0" />
            <BtmCell id="b1" />
            <BtmCell id="b2" />
            <BtmCell id="b3" />
            <BtmCell id="b4" />
          </View>
          <View style={styles.rowContainer}>
            <BtmCell id="b5" />
            <BtmCell id="b6" />
            <BtmCell id="b7" />
            <BtmCell id="b8" />
          </View>
        </>
      )}
    </View>
  );
}
