import {
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
  View,
} from "react-native";
import React, { useRef, useEffect, useContext, useState } from "react";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";
import {
  practiceSequence,
  cellRelationships,
  boardSegments,
} from "../Functions/Objects";
//import getIsNot from "../Functions/getIsNot";
import getIsNot6 from "../Functions/getIsNot6";
//import getCornerHints from "../Functions/getCornerHints";

export default function GameCell(props) {
  ////    ////    inits     ////    ////
  const consumeCtxt = useContext(GameContext);
  const consumeCtxtMeta = useContext(MetaContext);
  const animationA = useRef(new Animated.Value(0)).current;
  const onTouch = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    })
  ).current;
  const animationB = useRef(new Animated.Value(0)).current;
  const animateFlip = useRef(
    Animated.timing(animationB, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    })
  ).current;

  ////    ////    states    ////    ////
  const [defaultVal, setDefaultVal] = useState(null);
  const [color, setColor] = useState("white");
  const [val, setVal] = useState(null);
  const [style, setStyle] = useState(null);
  const [borderRadius, setBorderRadius] = useState(4);
  const [borderWidth, setBorderWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [hintStatus, setHintStatus] = useState("odd-even");
  const [isNotVal, setIsNotVal] = useState(null);
  const [isOdd, setIsOdd] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);

  ////      ////    functions       ////    ////
  const initHints = async () => {
    try {
      if (consumeCtxt.diff === "practice") {
        setColor("lightblue");
        if (consumeCtxt.solutions[props.id] % 2 === 0) {
          setIsOdd(false);
          setDefaultVal("E");
          setVal("E");
        } else {
          setIsOdd(true);
          setDefaultVal("O");
          setVal("O");
        }

        if (props.id === "c1_2") {
          setIsNotVal("! 9");
        } else if (props.id === "c5_4") {
          setIsNotVal("! 2");
        }
      } else if (
        consumeCtxt.diff === "break_my_brain" &&
        consumeCtxt.solutions[props.id] !== undefined &&
        consumeCtxt.longArray[0] !== undefined
      ) {
        setColor("lightblue");
        if (consumeCtxt.solutions[props.id] % 2 === 0) {
          setIsOdd(false);
          setDefaultVal("E");
          setVal("E");
        } else {
          setIsOdd(true);
          setDefaultVal("O");
          setVal("O");
        }
        const capObject = cellRelationships.six_x[props.id];
        setIsNotVal(
          await getIsNot6(
            consumeCtxt.longArray,
            consumeCtxt.solutions,
            props.id,
            capObject,
            consumeCtxt.diff
          )
        );
      } else {
        if (consumeCtxt.hintObj[props.id][0] !== null) {
          setColor("lightblue");
          if (consumeCtxt.hintObj[props.id][0] == "even") {
            setIsOdd(false);
            setDefaultVal("E");
            setVal("E");
          } else {
            setIsOdd(true);
            setDefaultVal("O");
            setVal("O");
          }

          if (consumeCtxt.hintObj[props.id][1] !== null) {
            setIsNotVal(`! ${consumeCtxt.hintObj[props.id][1]}`);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleHints = () => {
    try {
      if (isNotVal !== null) {
        setAnimating(true);
        setVal(null);
        animateFlip.start(() => {
          animationB.setValue(0);
        });
        setTimeout(() => {
          if (hintStatus === "is-not") {
            if (isOdd === true) {
              setDefaultVal("O");
              setVal("O");
            } else {
              setDefaultVal("E");
              setVal("E");
            }
            setHintStatus("odd-even");
          } else {
            setDefaultVal(isNotVal);
            setVal(isNotVal);
            setHintStatus("is-not");
          }
          setAnimating(false);
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTextStyle = () => {
    if (style === "inner") {
      return { fontWeight: "bold" };
    } else {
      if (isNaN(val)) {
        return { opacity: 0.25 };
      } else {
        return { opacity: 1 };
      }
    }
  };

  const pressHandler = (arg) => {
    try {
      if (arg === "lift-number") {
        consumeCtxt.liftNumber(props.id);
      } else if (arg === "drop-number") {
        consumeCtxt.dropNumber(props.id, val);
      } else if (arg === "reveal-odd") {
        //  Don't think this is used anymore.
        initHints();
      } else if (arg === "hint-press") {
        if (consumeCtxt.pressed[0] != null) {
          consumeCtxt.liftNumber(props.id);
        } else {
          toggleHints();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    //  Initialises style on first render.
    try {
      setStyle(props.style);
    } catch (err) {
      console.log(err);
    }
  }, [props.style]);

  useEffect(() => {
    //  Only relevant in practice mode.
    try {
      if (
        props.border === consumeCtxtMeta.colourScheme[props.colorA] ||
        props.border === consumeCtxtMeta.colourScheme[props.colorB]
      ) {
        setBorderWidth(4);
      } else {
        setBorderWidth(0);
      }
    } catch (err) {
      console.log(err);
    }
  }, [props.border]);

  useEffect(() => {
    try {
      if (style !== "nothing") {
        //  If cell is visible ...
        if (style !== "sum" && style !== "innerSum") {
          if (consumeCtxt.gameVals[props.id] === null) {
            //  If cell has been vacated, set displayed value == defaultVal.
            setVal(defaultVal);
          } else {
            //  Else, set displayed value == to gameVals element.
            setVal(consumeCtxt.gameVals[props.id]);
          }
        } else {
          if (style === "sum") {
            setVal(consumeCtxt.sums[props.id]);
          } else if (style === "innerSum") {
            setVal(consumeCtxt.solutions[props.id]);
          }
          if (consumeCtxt.sums[props.id] == consumeCtxt.solutions[props.id]) {
            setBorderRadius(90);
          } else {
            setBorderRadius(4);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.gameVals]);

  useEffect(() => {
    //  Updates value and sets border to 90 degrees (round) if the current value == the cell's solution.
    try {
      if (style === "sum" || style === "innerSum") {
        if (style === "sum") {
          setVal(consumeCtxt.sums[props.id]);
        } else {
          setVal(consumeCtxt.solutions[props.id]);
        }

        if (consumeCtxt.sums[props.id] == consumeCtxt.solutions[props.id]) {
          setBorderRadius(90);
        } else {
          setBorderRadius(4);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.sums]);

  //  * PRACTICE ONLY *   //
  useEffect(() => {
    //  The other hintPhase modes do not require any logic to run upon being activated; the component responds conditionally when an onPress event is fired.
    try {
      if (consumeCtxt.diff === "practice") {
        if (consumeCtxt.phase === 2) {
          setOpacity(0.1);
        } else {
          for (var i in practiceSequence[consumeCtxt.phase].reveal) {
            if (props.id === practiceSequence[consumeCtxt.phase].reveal[i]) {
              setOpacity(1);
            }
          }
        }

        for (var j in practiceSequence[consumeCtxt.phase].fix) {
          if (props.id === practiceSequence[consumeCtxt.phase].fix[j]) {
            setStyle("fixed");
          }
        }

        for (var k in practiceSequence[consumeCtxt.phase].odd_even) {
          if (props.id === practiceSequence[consumeCtxt.phase].odd_even[k]) {
            initHints();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.phase]);

  useEffect(() => {
    //  Since changing hint feature, this function should now be called only on initial render.
    try {
      for (var i = 0; i < consumeCtxt.cellsToFix.length; i++) {
        if (consumeCtxt.cellsToFix[i] == props.id) {
          setStyle("fixed");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.cellsToFix]);

  useEffect(() => {
    try {
      //  Reset userFixed cells when cC.userFixed array is emptied upon grid reset.
      if (style == "userFixed" && consumeCtxt.userFixed.length == 0) {
        setStyle("game");
      }

      for (var el of consumeCtxt.userFixed) {
        if (el == props.id) {
          setStyle("userFixed");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.userFixed]);

  useEffect(() => {
    if (consumeCtxt.solved === true) {
      if (style === "userFixed") {
        setStyle("game");
      }
    }
  }, [consumeCtxt.solved]);

  useEffect(() => {
    try {
      if (consumeCtxt.diff === "break_my_brain") {
        if (
          props.id === "c2_5" ||
          props.id === "c3_4" ||
          props.id === "c4_3" ||
          props.id === "c5_2"
        ) {
          initHints();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.solutions, consumeCtxt.longArray]);

  useEffect(() => {
    try {
      if (consumeCtxt.hintObj[props.id] !== undefined) {
        initHints();
      }
    } catch (err) {
      console.log(err);
      console.log("error line 374 GameCell");
    }
  }, [consumeCtxt.hintObj]);

  useEffect(() => {
    try {
      if (isNotVal !== null) {
        setTimeout(() => {
          toggleHints();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isNotVal]);

  useEffect(() => {
    try {
      if (consumeCtxt.smartGrid === "solve-right") {
        setOpacity(0.25);
        for (var i = 0; i < 8; i++) {
          for (var j = i; j < 8; j++) {
            let index = "c" + i + "_" + j;
            if (props.id === index) {
              setOpacity(1);
            }
          }
        }
      } else if (consumeCtxt.smartGrid === "solve-left") {
        setOpacity(0.25);
        for (var i = 0; i < 8; i++) {
          for (var j = i; j >= 0; j--) {
            let index = "c" + i + "_" + j;
            if (props.id === index) {
              setOpacity(1);
            }
          }
        }
      } else if (consumeCtxt.smartGrid === "default") {
        setOpacity(1);
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.smartGrid]);

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    cell: {
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      opacity: animationA.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [opacity, 0.5, opacity],
      }),
      transform: [
        {
          rotateY: animationB.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "90deg", "0deg"],
          }),
        },
      ],
    },
    game: {
      backgroundColor: color,
      borderRadius: 4,
      borderWidth,
    },
    sum: {
      backgroundColor: consumeCtxtMeta.colourScheme[props.colorA],
      borderRadius: borderRadius,
      borderWidth,
    },
    innerSum: {
      backgroundColor: consumeCtxtMeta.colourScheme[props.colorA],
      borderRadius: borderRadius,
      borderWidth: 1,
    },
    inner: {
      backgroundColor: consumeCtxtMeta.colourScheme[props.colorA],
      borderRadius: 4,
      borderWidth,
    },
    nothing: {
      backgroundColor: "none",
    },
    fixed: {
      backgroundColor: "lightgrey",
      borderRadius: 4,
      borderWidth,
    },
    userFixed: {
      backgroundColor: "lightgrey",
      borderRadius: 4,
      borderWidth,
    },
  });

  ////    ////    component   ////    ////

  return (
    <Pressable
      style={
        consumeCtxt.diff === "easy" ||
        consumeCtxt.diff === "not_so_easy" ||
        consumeCtxt.diff === "slightly_stressful" ||
        consumeCtxt.diff === "kinda_hard" ||
        consumeCtxt.diff === "pretty_damn_tricky" ||
        consumeCtxt.diff === "practice"
          ? { width: "13%" }
          : consumeCtxt.diff === "break_my_brain"
          ? { width: "11%" }
          : { width: "24%" }
      }
      onPress={() => {
        onTouch.start(() => {
          animationA.setValue(0);
        });
        if (
          consumeCtxt.pressable === true &&
          style === "game" &&
          opacity === 1 &&
          animating === false
        ) {
          if (isOdd === null) {
            //  If this is not a hint cell ...
            if (isNaN(val) || val === null) {
              pressHandler("lift-number");
            } else {
              pressHandler("drop-number");
            }
          } else {
            //  If it is, run extra checks by passing pressHandler the argument 'hint-press'.
            if (isNaN(val) || val === null) {
              pressHandler("hint-press");
            } else {
              pressHandler("drop-number");
            }
          }
        }
      }}
      onLongPress={() => {
        if (!isNaN(val)) {
          // If the cell is filled with a number...
          if (style == "userFixed") {
            Alert.alert(
              "Unfix tile?",
              "You can reverse this action later if you want.",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    consumeCtxt.editFixed("user-unfix", props.id, val);
                    setStyle("game");
                  },
                },
                {
                  text: "No",
                  onPress: () => {
                    //
                  },
                },
              ]
            );
          } else if (style == "game") {
            Alert.alert(
              "Fix tile?",
              "You can reverse this action later if you want.",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    consumeCtxt.editFixed("user-fix", props.id, val);
                    //  Style is set in useEffect.
                  },
                },
                {
                  text: "No",
                  onPress: () => {
                    //
                  },
                },
              ]
            );
          }
        }
      }}
    >
      <Animated.View style={[styles[style], styles.cell]}>
        {style !== "innerSum" ? (
          <Text
            style={
              consumeCtxt.mode === "game"
                ? [{ fontSize: consumeCtxtMeta.fontSizes.std }, getTextStyle()]
                : [
                    { fontSize: consumeCtxtMeta.fontSizes.subHeader },
                    getTextStyle(),
                  ]
            }
          >
            {val}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: consumeCtxtMeta.fontSizes.std,
              opacity: 1,
              fontWeight: "bold",
            }}
          >
            <Text style={{ opacity: 0.3 }}>
              {consumeCtxt.sums[props.id]} /{" "}
            </Text>

            {consumeCtxt.solutions[props.id]}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
