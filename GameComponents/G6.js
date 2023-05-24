import React from "react";
import { View, StyleSheet } from "react-native";
import { gridInfo6 } from "../Functions/Objects";
import GameCell from "./GameCell";

export default function G6() {
  const styles = StyleSheet.create({
    rowContainer: {
      height: "11%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });
  return (
    <>
      <View style={styles.rowContainer}>
        {gridInfo6.r0.map((el, i) => {
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
        {gridInfo6.r1.map((el, i) => {
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
        {gridInfo6.r2.map((el, i) => {
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
        {gridInfo6.r3.map((el, i) => {
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
        {gridInfo6.r4.map((el, i) => {
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
        {gridInfo6.r5.map((el, i) => {
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
        {gridInfo6.r6.map((el, i) => {
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
        {gridInfo6.r7.map((el, i) => {
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
