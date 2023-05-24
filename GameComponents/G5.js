import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { gridInfo5 } from "../Functions/Objects";
import GameCell from "./GameCell";
import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function G5() {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);
  const consumeCtxtMeta = useContext(MetaContext);

  ////    ////    states      ////    ////
  const [borderBold, setBorderBold] = useState(null);
  const [intvl, setIntvl] = useState(null);

  ////    ////    functions       ////    ////
  const intervalFunc = () => {
    const colors = [
      consumeCtxtMeta.colourScheme.red,
      consumeCtxtMeta.colourScheme.orange,
      consumeCtxtMeta.colourScheme.yellow,
      consumeCtxtMeta.colourScheme.green,
      consumeCtxtMeta.colourScheme.blue,
    ];
    let i = 0;

    //  Run setInterval function using setIntvl state variable. This allows us to clear the interval with a single command later on.
    setIntvl(
      setInterval(() => {
        //  Designate which rows and columns are highlighted in practice mode demonstration.
        setBorderBold(colors[i]);
        i++;
        if (i === 5) {
          i = 0;
        }
      }, 1000)
    );
  };

  ////    ////    useEffects      ////    ////
  useEffect(() => {
    try {
      if (consumeCtxt.phase === 0) {
        //  Clearing the setInterval was necessary earlier; probably isn't anymore but I'm too lazy/scared to remove it.
        clearInterval(intvl);
        setBorderBold(null);
      }

      if (consumeCtxt.phase === 1) {
        intervalFunc();
      }

      if (consumeCtxt.phase === 2) {
        clearInterval(intvl);
        setBorderBold(null);
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.phase]);

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    rowContainer: {
      height: "13%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });

  return (
    <>
      <View style={styles.rowContainer}>
        {gridInfo5.r0.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
              border={borderBold}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo5.r1.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
              border={borderBold}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo5.r2.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
              border={borderBold}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo5.r3.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
              border={borderBold}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo5.r4.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
              border={borderBold}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo5.r5.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
              border={borderBold}
            />
          );
        })}
      </View>
      <View style={styles.rowContainer}>
        {gridInfo5.r6.map((el, i) => {
          return (
            <GameCell
              key={el[0]}
              id={el[0]}
              style={el[1]}
              colorA={el[2]}
              colorB={el[3]}
              sumLinkA={el[4]}
              sumLinkB={el[5]}
              border={borderBold}
            />
          );
        })}
      </View>
    </>
  );
}
