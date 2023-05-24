import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Text,
  ImageBackground,
  Alert,
  StyleSheet,
  View,
  Animated,
  Pressable,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";

import PostGameModal from "./PostGameModal";
import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";
import playSound from "../Functions/sfx";
import getLetters from "../Functions/getLetters";
import HintModal from "./HintModal";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";
import LayoutGame from "./LayoutGame";

export default function GameComponent(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);
  const consumeCtxtMeta = useContext(MetaContext);

  ////      ////    states      ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [picRoute, setPicRoute] = useState(null);
  const [lettersEarned, setLettersEarned] = useState([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [orient, setOrient] = useState("portrait");
  const [isBonus, setIsBonus] = useState(false);
  const [weekSurvived, setWeekSurvived] = useState(null);
  const [confetti, setConfetti] = useState(false);

  ////    ////    functions   ////    ////
  const getReward = async () => {
    let bonus = false;
    if (consumeCtxtMeta.bonuses > 0) {
      bonus = true;
      setIsBonus(true);
      await AsyncStorage.setItem(
        "@bonuses",
        JSON.stringify(consumeCtxtMeta.bonuses - 1)
      );
      consumeCtxtMeta.updateBonuses();
    }

    const result = await getLetters(bonus, props.diff);
    setLettersEarned(result);

    var lettersClone = consumeCtxtMeta.letters;
    for (var i in result) {
      lettersClone.push(result[i]);
    }
    await AsyncStorage.setItem("@letters", JSON.stringify(lettersClone));
    consumeCtxtMeta.updateLetters();

    if (consumeCtxt.hints > 0) {
      let pointsToUser;
      if (bonus == false) {
        pointsToUser = consumeCtxt.hints;
        setPointsEarned(consumeCtxt.hints);
      } else {
        pointsToUser = consumeCtxt.hints * 2;
        setPointsEarned(consumeCtxt.hints * 2);
      }
      await AsyncStorage.setItem(
        "@points",
        (consumeCtxtMeta.points + pointsToUser).toString()
      );
      if (consumeCtxtMeta.points < consumeCtxtMeta.pointThreshold) {
        if (
          consumeCtxtMeta.points + pointsToUser >=
          consumeCtxtMeta.pointThreshold
        ) {
          setTimeout(() => {
            setWeekSurvived(true);
          }, 3600);
          await AsyncStorage.setItem(
            "@weeksSurvived",
            (consumeCtxtMeta.weeksSurvived + 1).toString()
          );
          consumeCtxtMeta.updateWeeksSurvived();
        }
      }
      if (consumeCtxtMeta.points + pointsToUser > consumeCtxtMeta.highScore) {
        await AsyncStorage.setItem(
          "@highScore",
          (consumeCtxtMeta.points + pointsToUser).toString()
        );
        consumeCtxtMeta.updateHighScore();
      }
      consumeCtxtMeta.updatePoints();
    }
  };

  const displayModal = (route) => {
    const displayProm = new Promise((resolve, reject) => {
      setPicRoute(route);
      resolve();
    });

    displayProm.then(() => {
      setTimeout(() => {
        setModalVisible(true);
      }, 1500);
    });
  };

  const handleOrientationChange = () => {
    const newOrientation =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "landscape"
        : "portrait";
    setOrient(newOrientation);
  };

  ////      ////    useEffects      ////    ////
  useEffect(() => {
    handleOrientationChange();
  }, []);

  useEffect(() => {
    const orientationListener = Dimensions.addEventListener(
      "change",
      handleOrientationChange
    );
    return () => {
      orientationListener.remove();
    };
  }, []);

  useEffect(() => {
    async function thisFunction() {
      if (consumeCtxt.solved === true) {
        playSound("puzzle-solved", consumeCtxtMeta.mute);
        getReward();
      }
    }

    thisFunction();
  }, [consumeCtxt.solved]);

  ////    ////    styles    ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      width: "100%",
    },
  });

  ////      ////    component       ////    ////
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../assets/canva1.png")}>
        <StatusBar hidden={true} />
        <View style={styles.parentContainer}>
          {consumeCtxt.isLoading == true ? (
            <ActivityIndicator />
          ) : (
            <LayoutGame
              displayModal={displayModal}
              orientation={orient}
              diff={props.diff}
            />
          )}
          <PostGameModal
            modalVisible={modalVisible}
            picRoute={picRoute}
            lettersEarned={lettersEarned}
            pointsEarned={pointsEarned}
            orientation={orient}
            isBonus={isBonus}
          />
          <HintModal
            modalVisible={consumeCtxt.hintModalVisible}
            orientation={orient}
          />
          {weekSurvived === true ? (
            <ConfettiCannon
              count={200}
              explosionSpeed={100}
              fadeOut={true}
              origin={{ x: -10, y: 10 }}
            />
          ) : null}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
