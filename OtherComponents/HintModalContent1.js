import React, { useState, useContext } from "react";
import { View, Text, Modal, StyleSheet, Image, Button } from "react-native";

import { MetaContext } from "../App";
import { GameContext } from "../GameComponents/SummieBoard";

export default function HintModalContent1(props) {
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
      <Text style={styles.headerTxt}>Hint types:</Text>
      <View
        style={{
          width: "100%",
          maxWidth: 600,
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "35%",
        }}
      >
        <View style={styles.exampleRow}>
          <View style={styles.exampleTile}>
            <Text style={styles.headerTxt}>O</Text>
          </View>
          <View style={{ width: "50%", justifyContent: "center" }}>
            <Text style={styles.stdText}>The value of the tile is odd</Text>
          </View>
        </View>
        <View style={styles.exampleRow}>
          <View style={styles.exampleTile}>
            <Text style={styles.headerTxt}>E</Text>
          </View>
          <View style={{ width: "50%", justifyContent: "center" }}>
            <Text style={styles.stdText}>The value of the tile is even</Text>
          </View>
        </View>
        <View style={styles.exampleRow}>
          <View style={styles.exampleTile}>
            <Text style={styles.headerTxt}>! 5</Text>
          </View>
          <View style={{ width: "50%", justifyContent: "center" }}>
            <Text style={styles.stdText}>
              The value of the tile{" "}
              <Text style={{ fontWeight: "bold" }}>is not</Text> 5
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.stdText}>
        You can flip an 'is-not' hint back to an 'odd-even' hint by simply
        tapping it.
      </Text>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          width: "96%",
          marginVertical: 5,
        }}
      />
      <Text style={[styles.subHeaderTxt, { fontWeight: "bold" }]}>
        What is the SmartGrid?
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          source={require("../assets/smartgrid_demo.png")}
          resizeMode="contain"
          style={{ height: 200, width: 150 }}
        />
        <View
          style={{
            width: "45%",
            height: 200,
            justifyContent: "space-evenly",
          }}
        >
          <Text style={{ fontSize: consumeCtxtMeta.fontSizes.small }}>
            The SmartGrid tells you which numbers appear exclusively on one side
            of the board.
          </Text>
          <Text style={{ fontSize: consumeCtxtMeta.fontSizes.small }}>
            It's a handy feature, but use it sparingly! Puzzles solved using
            SmartGrid earn only half as many points.
          </Text>
        </View>
      </View>

      <Button
        title="NEXT"
        onPress={() => {
          props.toggleIndex(1);
          //consumeCtxt.toggleHintModal();
        }}
      />
    </>
  );
}
