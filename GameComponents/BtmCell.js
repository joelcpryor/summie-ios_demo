import { Text, StyleSheet, Pressable, Animated, View } from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";

//import { boardSegments } from "../Functions/Objects";
import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";
import { boardSegments } from "../Functions/Objects";

export default function BtmCell(props) {
  ////    ////    initialisations     ////    ////
  const consumeCtxt = useContext(GameContext);
  const consumeCtxtMeta = useContext(MetaContext);
  const animationA = useRef(new Animated.Value(0)).current;

  ////    ////    states      ////    ////
  const [id, setId] = useState(null);
  const [val, setVal] = useState(null);
  const [color, setColor] = useState("white");
  const [renderMe, setRenderMe] = useState(false);
  const [opacity, setOpacity] = useState(1);

  ////    ////    functions   ////    ////
  const checkOpacity = () => {
    try {
      let bS;
      if (
        consumeCtxt.diff === "easy" ||
        consumeCtxt.diff === "not_so_easy" ||
        consumeCtxt.diff === "slightly_stressful" ||
        consumeCtxt.diff === "kinda_hard"
      ) {
        bS = boardSegments.five_x;
      } else {
        bS = boardSegments.six_x;
      }

      if (consumeCtxt.smartGrid === "solve-right") {
        setOpacity(0.25);
        for (var el of bS.right.inner) {
          if (
            consumeCtxt.btmVals[props.id] === consumeCtxt.solutions[el] &&
            consumeCtxt.cellsToFix.indexOf(el) === -1
          ) {
            setOpacity(1);
          }
        }
      } else if (consumeCtxt.smartGrid === "solve-left") {
        setOpacity(0.25);
        for (var el of bS.left.inner) {
          if (
            consumeCtxt.btmVals[props.id] === consumeCtxt.solutions[el] &&
            consumeCtxt.cellsToFix.indexOf(el) === -1
          ) {
            setOpacity(1);
          }
        }
      } else if (consumeCtxt.smartGrid === "default") {
        setOpacity(1);
      }
    } catch (err) {}
  };

  ////    ////    useEffects  ////    ////

  useEffect(() => {
    try {
      setId(props.id);
    } catch (err) {
      console.log(err);
    }
  }, [props.id]);

  useEffect(() => {
    try {
      if (consumeCtxt.btmVals[props.id] !== undefined) {
        setRenderMe(true);
      } else {
        setRenderMe(false);
      }

      setVal(consumeCtxt.btmVals[props.id]);
      if (
        consumeCtxt.smartGrid !== "default" &&
        consumeCtxt.smartGrid !== null
      ) {
        checkOpacity();
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.btmVals]);

  useEffect(() => {
    // Set color when pressed array updates.
    try {
      if (consumeCtxt.pressed[0] === id && consumeCtxt.pressed[0] !== null) {
        setColor("violet");
      } else {
        setColor("white");
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.pressed]);

  useEffect(() => {
    /*if (consumeCtxt.solved === true && consumeCtxt.phase === 0) {
      //  If puzzle has been solved in game mode ...
      Animated.timing(animationA, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }*/
  }, [consumeCtxt.solved]);

  useEffect(() => {
    //
  }, [consumeCtxt.phase]);

  useEffect(() => {
    try {
      //
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.hintPhase]);

  useEffect(() => {
    try {
      checkOpacity();
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.smartGrid]);

  ////    ////    styles      ////    ////

  const styles = StyleSheet.create({
    cell: {
      height: "100%",
      maxHeight: 60,
      maxWidth: 90,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color,
      borderWidth: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      opacity: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [opacity, 0],
      }),
    },
  });

  ////    ////    component   ////    ////

  return (
    <>
      {renderMe === true ? (
        <Pressable
          style={{ width: "13%" }}
          onPress={() => {
            //  Check whether cell is active and not empty.
            if (val !== null && val !== undefined && opacity === 1) {
              //  If cell is currently highlighted, remove highlight. Otherwise, hightlight it.
              if (consumeCtxt.pressed[0] === id) {
                consumeCtxt.btmPress(null, null);
              } else {
                consumeCtxt.btmPress(id, val);
              }
            }
          }}
        >
          <Animated.View style={styles.cell}>
            <Text style={{ fontSize: consumeCtxtMeta.fontSizes.std }}>
              {val}
            </Text>
          </Animated.View>
        </Pressable>
      ) : null}
    </>
  );
}
