import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, Pressable, Animated } from "react-native";

import { LetterContext } from "../Screens/LetterBox";
import { MetaContext } from "../App";

export default function Letter(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(LetterContext);
  const metaCtxt = useContext(MetaContext);
  const animationA = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).current;

  ////      ////    states      ////    ////
  const [color, setColor] = useState("whitesmoke");
  const [pressable, setPressable] = useState(false);

  ////      ////    functions       ////    ////
  ////      ////    useEffects      ////    ////
  useEffect(() => {
    if (props.letter == consumeCtxt.fadeLetter) {
      fadeIn.start();
      setPressable(true);
    }
  }, [consumeCtxt.fadeLetter]);

  useEffect(() => {
    if (props.uid == consumeCtxt.selectedId) {
      setColor("lightgreen");
    } else {
      if (color !== "gold") {
        setColor("whitesmoke");
      }
    }
  }, [consumeCtxt.selectedId]);

  useEffect(() => {
    if (props.uid == consumeCtxt.locked) {
      setColor("gold");
    }
    if (consumeCtxt.locked === "") {
      setColor("whitesmoke");
    }
  }, [consumeCtxt.locked]);

  ////      ////    component       ////    ////
  return (
    <Pressable
      style={{ width: "12%" }}
      onPress={() => {
        if (pressable == true) {
          if (color == "lightgreen") {
            consumeCtxt.letterPress(null, null);
          } else if (color == "whitesmoke") {
            consumeCtxt.letterPress(props.uid, props.letter);
          }
        }
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          backgroundColor: color,
          paddingVertical: 8,
          marginVertical: 4,
          transform: [
            {
              rotateX: animationA.interpolate({
                inputRange: [0, 1],
                outputRange: ["90deg", "0deg"],
              }),
            },
          ],
        }}
      >
        <Text style={{ fontSize: metaCtxt.fontSizes.std }}>{props.letter}</Text>
      </Animated.View>
    </Pressable>
  );
}
