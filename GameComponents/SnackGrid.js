import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MetaContext } from "../App";
import { GameContext } from "./SummieBoard";
import { gridInfo3 } from "../Functions/Objects";
import GameCell from "./GameCell";

export default function SnackGrid() {
  ////    ////    inits       ////    ////
  const metaCtxt = useContext(MetaContext);
  const consumeCtxt = useContext(GameContext);

  ////      ////    states      ////    ////

  ////      ////    functions       ////    ////
  ////      ////    styles      ////    ////
  const styles = StyleSheet.create({
    rowContainer: {
      height: "24%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });
  ////      ////    component       ////    ////
  return (
    <>
      <View style={styles.rowContainer}>
        {gridInfo3.r0.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo3.r1.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo3.r2.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo3.r3.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
            />
          );
        })}
      </View>
    </>
  );
}
