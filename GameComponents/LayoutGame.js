import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Alert,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GameGrid from "./GameGrid";
import BtmGrid from "./BtmGrid";
import CounterElements from "./CounterElements";

import { headerInfo } from "../Functions/Objects";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function LayoutGame(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);
  const consumeCtxtMeta = useContext(MetaContext);
  const navigation = useNavigation();
  const viewRef = useRef();
  const animationA = useRef(new Animated.Value(0)).current;
  const animLinear = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    })
  ).current;

  ////    ////    states    ////    ////
  const [VSHeight, setVSHeight] = useState("70%");
  const [NVSHeight, setNVSHeight] = useState("100%");
  const [VSWidth, setVSWidth] = useState("28%");
  const [NVSWidth, setNVSWidth] = useState("96%");

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    async function thisFunction() {
      if (consumeCtxt.solved === true) {
        //  The 250ms delay makes the animation much smoother.
        setTimeout(() => {
          animLinear.start();
        }, 250);

        setTimeout(() => {
          captureRef(viewRef, {
            format: "jpg",
            quality: 0.9,
          }).then(
            (uri) => props.displayModal(uri),
            (error) => console.log(error)
          );
        }, 3500);
      }
    }
    thisFunction();
  }, [consumeCtxt.solved]);

  useEffect(() => {
    try {
      if (props.orientation === "portrait") {
        setVSHeight("70%");
        setVSWidth("100%");
        setNVSHeight("30%");
        setNVSWidth("96%");
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
      height: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [VSHeight, "100%"],
      }),
      width: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [VSWidth, "100%"],
      }),
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 10,
    },
    nonViewShot: {
      height: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [NVSHeight, "0%"],
      }),
      width: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [NVSWidth, "0%"],
      }),
      opacity: animationA.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 0],
      }),
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor:
        props.orientation === "portrait" ? null : "rgba(0,0,0,0.6)",
    },
    headerContainer: {
      flexDirection: "row",
      height: "10%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(0,0,0,0.9)",
    },
    counterContainer: {
      height: animationA.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["12%", "10%", "0%"],
      }),
      width: consumeCtxtMeta.dimensions.width * 0.96,
      maxWidth: consumeCtxtMeta.dimensions.height * 0.55,
      justifyContent: "center",
      alignItems: "center",
      opacity: animationA.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 0],
      }),
    },
    gameContainer: {
      height: animationA.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["78%", "78%", "100%"],
      }),
      width: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: ["96%", "100%"],
      }),
      maxWidth: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [
          consumeCtxtMeta.dimensions.height * 0.55,
          consumeCtxtMeta.dimensions.height,
        ],
      }),
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: 5,
      borderRadius: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [8, 0],
      }),
      backgroundColor: animationA.interpolate({
        inputRange: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        outputRange: [
          "rgba(0, 0, 0, 0.3)",
          consumeCtxtMeta.colourScheme.red,
          consumeCtxtMeta.colourScheme.orange,
          consumeCtxtMeta.colourScheme.yellow,
          consumeCtxtMeta.colourScheme.green,
          consumeCtxtMeta.colourScheme.blue,
          consumeCtxtMeta.colourScheme.violet,
          "rgba(0, 0, 0, 0.9)",
        ],
      }),
    },
    headerContent: {
      width: "50%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    homeBtn: {
      opacity: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      width: "15%",
      alignItems: "center",
    },
    counterText: {
      fontSize: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [1, consumeCtxtMeta.fontSizes.std],
      }),
      opacity: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      fontWeight: "bold",
      color: "aliceblue",
    },
  });

  ////    ////    component   ////    ////
  return (
    <View style={styles.parentContainer}>
      <Animated.View style={styles.viewShot} ref={viewRef}>
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

        <Animated.View style={styles.counterContainer}>
          <CounterElements />
        </Animated.View>

        <Animated.View style={styles.gameContainer}>
          <Animated.View style={styles.counterDisplay}>
            <Animated.Text style={styles.counterText}>
              You finished in {consumeCtxt.counter} moves!
            </Animated.Text>
          </Animated.View>
          <GameGrid diff={props.diff} />
        </Animated.View>
      </Animated.View>

      <Animated.View style={styles.nonViewShot}>
        {props.orientation === "landscape" ? (
          <BannerAd
            size={BannerAdSize.MEDIUM_RECTANGLE}
            unitId="ca-app-pub-4156613766325791/4297373042"
            requestOptions={{
              requestNonPersonalizedAdsOnly: consumeCtxtMeta.targetedAds,
            }}
          />
        ) : null}
        <BtmGrid orientation={props.orientation} diff={props.diff} />
      </Animated.View>
    </View>
  );
}
