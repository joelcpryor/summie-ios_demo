import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Text,
  ImageBackground,
  Alert,
  StyleSheet,
  View,
  Animated,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";

import LayoutSnack from "./LayoutSnack";
import PostSnackModal from "./PostSnackModal";
import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";
import playSound from "../Functions/sfx";
import { snackRef } from "../Functions/Objects";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function SnackComponent(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);
  const consumeCtxtMeta = useContext(MetaContext);
  const countdownRef = useRef(null);
  const countdownTime = 180;

  ////      ////    states      ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [orient, setOrient] = useState("portrait");
  const [isBonus, setIsBonus] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [countdown, setCountdown] = useState(180);
  const [gameState, setGameState] = useState("pre");

  ////    ////    functions   ////    ////
  const rewardUser = async () => {
    if (consumeCtxtMeta.bonuses > 0) {
      await AsyncStorage.setItem(
        "@bonuses",
        JSON.stringify(consumeCtxtMeta.bonuses - 1)
      );
    }

    let pts = puzzlesSolved * snackRef[props.diff];
    setPointsEarned(pts);
    if (pts > 0) {
      let newPts = pts + consumeCtxtMeta.points;
      await AsyncStorage.setItem("@points", newPts.toString());
      if (newPts > consumeCtxtMeta.highScore) {
        await AsyncStorage.setItem("@highScore", newPts.toString());
      }
      if (consumeCtxtMeta.points < consumeCtxtMeta.pointThreshold) {
        if (newPts >= consumeCtxtMeta.pointThreshold) {
          await AsyncStorage.setItem(
            "@weeksSurvived",
            (consumeCtxtMeta.weeksSurvived + 1).toString()
          );
          setConfetti(true);
        }
      }
    }
    consumeCtxtMeta.initData();
  };

  const handleTransition = () => {
    rewardUser();
    setTimeout(() => {
      setModalVisible(true);
    }, 3000);
  };

  const startCountdown = () => {
    let timeLeft = countdownTime;
    countdownRef.current = setInterval(() => {
      timeLeft--;
      if (timeLeft === 0) {
        clearInterval(countdownRef.current);
        setGameState("post");
        playSound("time-expired", consumeCtxtMeta.mute);
      }
      setCountdown(timeLeft);
    }, 1000);
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

    setTimeout(() => {
      setGameState("active");
      startCountdown();
    }, 3000);
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
    if (consumeCtxt.solved === true) {
      setPuzzlesSolved((prev) => prev + 1);
      playSound("snack-solved", consumeCtxtMeta.mute);
    }
  }, [consumeCtxt.solved]);

  useEffect(() => {
    if (gameState === "post") {
      handleTransition();
    }
  }, [gameState]);

  ////      ////        styles      ////        ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      width: "100%",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../assets/canva1.png")}>
        <GlobalStatusBar />
        <View style={styles.parentContainer}>
          {consumeCtxt.isLoading == true ? (
            <ActivityIndicator />
          ) : (
            <LayoutSnack
              orientation={orient}
              diff={props.diff}
              puzzlesSolved={puzzlesSolved}
              countdown={countdown}
              gameState={gameState}
            />
          )}
          <PostSnackModal
            modalVisible={modalVisible}
            pointsEarned={pointsEarned}
            orientation={orient}
            isBonus={isBonus}
          />
          {confetti === true ? (
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
