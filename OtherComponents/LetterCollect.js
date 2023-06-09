import { Text, StyleSheet, View, Alert, Animated } from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import playSound from "../Functions/sfx";
import { Entypo } from "@expo/vector-icons";

import LetterEarned from "./LetterEarned";

import { MetaContext } from "../App";
import { GameContext } from "../GameComponents/SummieBoard";

export default function LetterCollect(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);
  const consumeCtxtGame = useContext(GameContext);
  const colors = [
    consumeCtxt.colourScheme.red,
    consumeCtxt.colourScheme.orange,
    consumeCtxt.colourScheme.yellow,
    consumeCtxt.colourScheme.green,
    consumeCtxt.colourScheme.blue,
    consumeCtxt.colourScheme.violet,
  ];
  const animationA = useRef(new Animated.Value(0)).current;
  const animateText = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;
  const countupRef = useState(null);

  ////    ////    states      ////    ////
  const [animateWhich, setAnimateWhich] = useState(null);
  const [matchesObject, setMatchesObject] = useState({});
  const [animationComplete, setAnimationComplete] = useState(false);
  const [textDisplay, setTextDisplay] = useState("");
  const [ascendSteak, setAscendStreak] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  ////    ////    functions   ////    ////
  const increasePoints = (current, total) => {
    let currentPoints = current;
    countupRef.current = setInterval(() => {
      currentPoints++;
      if (currentPoints === total) {
        clearInterval(countupRef.current);
      }
      setTotalPoints(currentPoints);
    }, 200);
  };

  const handleBonus = async () => {
    await AsyncStorage.setItem(
      "@points",
      (consumeCtxt.points + bonusPoints).toString()
    );
    if (consumeCtxt.points + bonusPoints > consumeCtxt.highScore) {
      await AsyncStorage.setItem(
        "@highScore",
        (consumeCtxt.points + bonusPoints).toString()
      );
    }
    consumeCtxt.updatePoints();
    consumeCtxt.updateHighScore();
  };

  const registerSurvival = async () => {
    try {
      await AsyncStorage.setItem(
        "@weeksSurvived",
        (consumeCtxt.weeksSurvived + 1).toString()
      );
      consumeCtxt.updateWeeksSurvived();
    } catch (err) {
      console.log(err);
    }
  };

  const calculatePoints = async () => {
    try {
      const ascendingResult = await checkAscending();
      const matchesResult = await checkForMatches();
      let pointsEarned = 0;
      if (ascendingResult > 0) {
        pointsEarned = ascendingResult * ascendingResult;
        setAscendStreak(ascendingResult);
        //setBonusPoints(pointsEarned);
      } else {
        if (Object.keys(matchesResult).length > 0) {
          for (var i in matchesResult) {
            if (matchesResult[i] == 2) {
              pointsEarned += 10;
            } else if (matchesResult[i] == 3) {
              pointsEarned += 20;
            } else if (matchesResult[i] == 4) {
              pointsEarned += 30;
            } else if (matchesResult[i] == 5) {
              pointsEarned += 50;
            } else if (matchesResult[i] == 6) {
              pointsEarned += 100;
            }
          }
        }
        setMatchesObject(matchesResult);
        //setBonusPoints(pointsEarned);
      }
      if (props.isBonus === true) {
        setBonusPoints(pointsEarned * 2);
      } else {
        setBonusPoints(pointsEarned);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAscending = () => {
    try {
      return new Promise((resolve, reject) => {
        let ascendingStreak = 1;
        if (props.lettersEarned.length > 1) {
          for (var i = 0; i < props.lettersEarned.length - 1; i++) {
            if (
              props.lettersEarned[i].charCodeAt(0) <
              props.lettersEarned[i + 1].charCodeAt(0)
            ) {
              ascendingStreak++;
            } else {
              ascendingStreak = 0;
              break;
            }
          }
        } else {
          ascendingStreak = 0;
        }
        resolve(ascendingStreak);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkForMatches = () => {
    try {
      return new Promise((resolve, reject) => {
        let tempObj = {};
        for (var i in props.lettersEarned) {
          const comparison = props.lettersEarned[i];
          const filtered = props.lettersEarned.filter((x) => x === comparison);
          if (filtered.length > 1) {
            tempObj[props.lettersEarned[i]] = filtered.length;
          }
        }
        resolve(tempObj);
      });
    } catch (err) {
      console.log(err);
    }
  };

  ////  ////    useEffects      ////    ////
  useEffect(() => {
    if (props.lettersEarned.length === 1) {
      setTextDisplay("You earned 1 letter!");
    } else {
      setTextDisplay("You earned " + props.lettersEarned.length + " letters!");
    }

    setTimeout(() => {
      for (let i = 0; i < props.lettersEarned.length; i++) {
        setTimeout(() => {
          setAnimateWhich(colors[i]);
          if (i === props.lettersEarned.length - 1) {
            setTimeout(() => {
              animateText.start();
            }, 1000);
          }
        }, i * 2000);
      }
    }, 1500);

    //  Cannot be nested in the other setTimeout() for some reason.
    setTimeout(() => {
      setAnimationComplete(true);
    }, (props.lettersEarned.length + 1) * 2000);

    calculatePoints();
  }, []);

  useEffect(() => {
    if (animationComplete === true) {
      if (bonusPoints > 0) {
        playSound("bonus-received", consumeCtxt.mute);
        if (ascendSteak > 0) {
          //animationA.setValue(0);
          setTextDisplay("Ascending streak!");
          setTimeout(() => {
            if (
              consumeCtxt.points < consumeCtxt.pointThreshold &&
              consumeCtxt.points + bonusPoints >= consumeCtxt.pointThreshold
            ) {
              Alert.alert("Congratulations!", "You survived another week!");
              registerSurvival();
            }
            increasePoints(totalPoints, totalPoints + bonusPoints);
          }, 1500);
        } else if (Object.keys(matchesObject).length > 0) {
          //animationA.setValue(0);
          setTextDisplay("Matching letters!");
          setTimeout(() => {
            if (
              consumeCtxt.points < consumeCtxt.pointThreshold &&
              consumeCtxt.points + bonusPoints >= consumeCtxt.pointThreshold
            ) {
              Alert.alert("Congratulations!", "You survived another week!");
              registerSurvival();
            }

            increasePoints(totalPoints, totalPoints + bonusPoints);
          }, 1500);
        }
        handleBonus();
      }
      setTimeout(() => {
        if (props.practice === false) {
          props.registerAnimationComplete();
        }
      }, 1500);
    }
  }, [animationComplete]);

  useEffect(() => {
    try {
      setTotalPoints(props.pointsEarned);
    } catch (err) {
      console.log(err);
    }
  }, [props.pointsEarned]);

  ////      ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: consumeCtxtGame.solved === true ? "16%" : "10%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-evenly",
      borderWidth: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    rowContainer: {
      width: "96%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    animatedTxt: {
      fontSize: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 16],
      }),
      color: "gold",
      fontWeight: "bold",
      opacity: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  });

  ////    ////    component       ////    ////
  return (
    <View style={styles.parentContainer}>
      {consumeCtxtGame.solved === true ? (
        <>
          <Text style={{ color: "white", fontSize: consumeCtxt.fontSizes.std }}>
            {` ${textDisplay} `}
          </Text>
          <View style={styles.rowContainer}>
            {props.lettersEarned.map((letter, index) => {
              return (
                <LetterEarned
                  key={index}
                  id={index}
                  letter={letter}
                  color={colors[index]}
                  animateWhich={animateWhich}
                  matches={matchesObject}
                  ascendStreak={ascendSteak}
                  animationComplete={animationComplete}
                />
              );
            })}
          </View>
          {props.pointsEarned > 0 ? (
            <>
              {props.pointsEarned === 1 ? (
                <Animated.Text
                  style={styles.animatedTxt}
                >{` +1 point! `}</Animated.Text>
              ) : props.pointsEarned > 1 && props.isBonus === false ? (
                <Animated.Text style={styles.animatedTxt}>
                  {` +${totalPoints} points! `}
                </Animated.Text>
              ) : props.pointsEarned > 1 && props.isBonus === true ? (
                <>
                  <Animated.Text style={styles.animatedTxt}>
                    +{totalPoints} points!{" "}
                    <Animated.Text style={{ color: "gold" }}>
                      // POWERPLAY ACTIVE
                    </Animated.Text>
                    {""}
                  </Animated.Text>
                </>
              ) : null}
            </>
          ) : null}
        </>
      ) : (
        <>
          <Text
            style={{
              color: "white",
              fontSize: consumeCtxt.fontSizes.subHeader,
            }}
          >
            You made too many mistakes!
          </Text>
        </>
      )}
    </View>
  );
}
