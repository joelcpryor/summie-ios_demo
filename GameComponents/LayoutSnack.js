import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Easing,
  Button,
  Alert,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SnackGrid from "./SnackGrid";
import BtmSnack from "./BtmSnack";
//import CounterElements from "./CounterElements";

import { headerInfo } from "../Functions/Objects";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function LayoutSnack(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);
  const consumeCtxtMeta = useContext(MetaContext);
  const navigation = useNavigation();
  const animationA = useRef(new Animated.Value(0)).current;
  const zoomIn = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 750,
      useNativeDriver: false,
      easing: Easing.bounce,
    })
  ).current;
  const animationB = useRef(new Animated.Value(0)).current;
  const tumbleDown = useRef(
    Animated.timing(animationB, {
      toValue: 750,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;
  const animationC = useRef(new Animated.Value(0)).current;
  const fadeBtm = useRef(
    Animated.timing(animationC, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;
  const animationD = useRef(new Animated.Value(0)).current;
  const wobbleText = useRef(
    Animated.timing(animationD, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;

  ////    ////    states    ////    ////
  const [VSHeight, setVSHeight] = useState("70%");
  const [NVSHeight, setNVSHeight] = useState("100%");
  const [VSWidth, setVSWidth] = useState("28%");
  const [NVSWidth, setNVSWidth] = useState("96%");

  ////      ////    functions       ////    ////
  const newSnack = async () => {
    await consumeCtxt.initNewSnack();
    zoomIn.start();
  };

  const handleSuccess = async () => {
    tumbleDown.start();
    fadeBtm.start();
    setTimeout(() => {
      animationA.setValue(0);
      animationB.setValue(0);
      animationC.setValue(0);
      newSnack();
    }, 1000);
  };

  const getMax = () => {
    if (consumeCtxtMeta.dimensions.height >= 1133) {
      return 400;
    } else {
      return consumeCtxtMeta.dimensions.height * 0.4;
    }
  };

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    async function thisFunction() {
      if (consumeCtxt.solved === true) {
        handleSuccess();
      }
    }
    thisFunction();
  }, [consumeCtxt.solved]);

  useEffect(() => {
    try {
      if (props.orientation === "portrait") {
        setVSHeight("75%");
        setVSWidth("100%");
        setNVSHeight("25%");
        setNVSWidth("100%");
      } else if (props.orientation === "landscape") {
        setVSHeight("100%");
        setVSWidth("60%");
        setNVSHeight("100%");
        setNVSWidth("40%");
      }
    } catch (err) {
      console.log(err);
    }
  }, [props.orientation]);

  useEffect(() => {
    if (props.gameState === "active") {
      zoomIn.start();
    } else if (props.gameState === "pre") {
      setTimeout(() => {
        wobbleText.start();
      }, 500);
    }
  }, [props.gameState]);

  useEffect(() => {
    //
  }, []);

  ////    ////    styles    ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      width: "100%",
      flexDirection: props.orientation === "portrait" ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    viewShot: {
      height: VSHeight,
      width: VSWidth,
      justifyContent: "space-between",
      alignItems: "center",
    },
    nonViewShot: {
      height: NVSHeight,
      width: NVSWidth,
      opacity: 1,
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    headerContainer: {
      flexDirection: "row",
      height: "10%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(0,0,0,0.9)",
    },
    headerContent: {
      width: "50%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    homeBtn: {
      opacity: 1,
      width: "15%",
      alignItems: "center",
    },
    gameContainer: {
      height: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [1, consumeCtxtMeta.dimensions.width * 0.9],
      }),
      width: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [1, consumeCtxtMeta.dimensions.width * 0.9],
      }),
      maxHeight: getMax(),
      maxWidth: getMax(),
      transform: [
        {
          translateX: animationB,
        },
      ],
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 4,
      borderRadius: 4,
      borderWidth: 2,
      opacity: animationC.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
    },
    counterContainer: {
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.3)",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    focusText: {
      transform: [
        {
          rotateZ: animationD.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: ["0deg", "-33deg", "0deg", "33deg", "0deg"],
          }),
        },
      ],
      fontSize: consumeCtxtMeta.fontSizes.biggest,
    },
    landscapeContainer: {
      height: "25%",
      backgroundColor: "rgba(0,0,0,0.6)",
      width: "100%",
    },
  });

  ////    ////    component   ////    ////
  return (
    <View style={styles.parentContainer}>
      <Animated.View style={styles.viewShot}>
        <View style={styles.headerContainer}>
          <View style={{ width: "15%" }} />
          <View style={styles.headerContent}>
            {headerInfo.map((el, i) => {
              return (
                <Text
                  style={{
                    color: consumeCtxtMeta.colourScheme[el[1]],
                    fontSize: consumeCtxtMeta.fontSizes.biggest,
                    fontWeight: "bold",
                  }}
                  key={`${el}-${i}`}
                >
                  {el[0]}
                </Text>
              );
            })}
          </View>
          <Animated.View style={styles.homeBtn}>
            <Pressable
              onPress={() => {
                Alert.alert(
                  "Go back?",
                  "If you return to the menu, your progress will be lost.",
                  [
                    {
                      text: "Return to menu",
                      onPress: () => {
                        navigation.navigate("Menu");
                      },
                    },
                    {
                      text: "Keep playing",
                      onPress: () => {
                        console.log("Alert dismissed");
                      },
                    },
                  ]
                );
              }}
            >
              {consumeCtxtMeta.dimensions.width > 480 ? (
                <MaterialCommunityIcons
                  name="home-circle"
                  size={39}
                  color="white"
                />
              ) : (
                <MaterialCommunityIcons
                  name="home-circle"
                  size={26}
                  color="white"
                />
              )}
            </Pressable>
          </Animated.View>
        </View>
        {props.orientation === "portrait" ? (
          <>
            <BannerAd
              unitId={TestIds.BANNER}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
            <View style={styles.counterContainer}>
              <Text style={{ fontSize: consumeCtxtMeta.fontSizes.std }}>
                Countdown: {props.countdown}
              </Text>
              <Text style={{ fontSize: consumeCtxtMeta.fontSizes.std }}>
                Solved: {props.puzzlesSolved}
              </Text>
            </View>
          </>
        ) : (
          <Text style={{ fontSize: consumeCtxtMeta.fontSizes.header }}>
            {props.countdown}
          </Text>
        )}
        <View
          style={{
            height: consumeCtxtMeta.dimensions.width * 0.9,
            width: consumeCtxtMeta.dimensions.width * 0.9,
            maxHeight: getMax(),
            maxWidth: getMax(),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.gameState === "active" ? (
            <Animated.View style={styles.gameContainer}>
              <SnackGrid />
            </Animated.View>
          ) : props.gameState === "pre" ? (
            <Animated.Text style={styles.focusText}>Let's play!</Animated.Text>
          ) : props.gameState === "post" ? (
            <Text
              style={{
                fontSize: consumeCtxtMeta.fontSizes.header,
                fontWeight: "bold",
              }}
            >
              Time's up!
            </Text>
          ) : null}
        </View>

        {props.orientation === "landscape" ? (
          <View style={styles.landscapeContainer}>
            <BtmSnack gameState={props.gameState} />
          </View>
        ) : (
          <Text />
        )}
      </Animated.View>

      <Animated.View style={styles.nonViewShot}>
        {props.orientation === "landscape" ? (
          <>
            <BannerAd
              size={BannerAdSize.MEDIUM_RECTANGLE}
              unitId="ca-app-pub-4156613766325791/4297373042"
              requestOptions={{
                requestNonPersonalizedAdsOnly: consumeCtxtMeta.targetedAds,
              }}
            />
            <Text
              style={{
                fontSize: consumeCtxtMeta.fontSizes.header,
                fontWeight: "bold",
                color: "gold",
              }}
            >
              Solved: {props.puzzlesSolved}
            </Text>
            <Text />
          </>
        ) : (
          <BtmSnack gameState={props.gameState} />
        )}
      </Animated.View>
    </View>
  );
}
