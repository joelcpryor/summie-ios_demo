import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Button,
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";

import GameGrid from "./GameGrid";
import BtmRow from "./BtmRow";
import BtmCell from "./BtmCell";
import SpacedContainer from "../OtherComponents/SpacedContainer";
import PostPracticeModal from "./PostPracticeModal";
import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";
import { practiceSequence } from "../Functions/Objects";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function LayoutPractice(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);
  const metaCtxt = useContext(MetaContext);
  const animationA = useRef(new Animated.Value(0)).current;
  const animLinear = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    })
  ).current;
  const scrollRef = useRef();

  ////      ////    states      ////    ////
  const [modalVisible, setModalVisible] = useState(false);

  const [VSHeight, setVSHeight] = useState("70%");
  const [NVSHeight, setNVSHeight] = useState("100%");
  const [VSWidth, setVSWidth] = useState("28%");
  const [NVSWidth, setNVSWidth] = useState("96%");

  ////    ////    functions   ////    ////

  ////      ////    useEffects      ////    ////
  useEffect(() => {
    try {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });

      if (consumeCtxt.phase === 6 && props.orientation === "portrait") {
        setVSHeight("82%");
        setNVSHeight("18%");
      }
    } catch (err) {
      console.log(err);
    }
  }, [consumeCtxt.phase]);

  useEffect(() => {
    if (consumeCtxt.solved === true) {
      animLinear.start();
      setTimeout(() => {
        setModalVisible(true);
      }, 3500);
    }
  }, [consumeCtxt.solved]);

  useEffect(() => {
    try {
      if (props.orientation === "portrait") {
        setVSWidth("100%");
        setNVSWidth("96%");
        if (consumeCtxt.phase >= 6) {
          setVSHeight("82%");
          setNVSHeight("18%");
        } else {
          setVSHeight("90%");
          setNVSHeight("10%");
        }
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
      padding: 4,
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
      justifyContent:
        props.orientation === "portrait" ? "space-evenly" : "center",
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
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor:
        props.orientation === "portrait" ? null : "rgba(0,0,0,0.6)",
      padding: 5,
    },
    headerContainer: {
      flexDirection: "row",
      height: "10%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(0,0,0,0.9)",
      borderWidth: 1,
    },
    counterContainer: {
      borderWidth: 1,
    },
    gameContainer: {
      height: animationA.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["70%", "70%", "100%"],
      }),
      width: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: ["96%", "100%"],
      }),
      maxWidth: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [
          metaCtxt.dimensions.height * 0.55,
          metaCtxt.dimensions.height,
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
        inputRange: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
        outputRange: [
          "rgba(0, 0, 0, 0.25)",
          "red",
          "orange",
          "yellow",
          "limegreen",
          "dodgerblue",
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
        outputRange: [1, metaCtxt.fontSizes.std],
      }),
      opacity: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      fontWeight: "bold",
      color: "aliceblue",
    },
  });

  ////      ////    component       ////    ////
  return (
    <SafeAreaView>
      <ImageBackground source={require("../assets/canva1.png")}>
        <GlobalStatusBar />
        <View style={styles.parentContainer}>
          {consumeCtxt.isLoading == true ? (
            <ActivityIndicator />
          ) : (
            <>
              <Animated.View style={styles.viewShot}>
                {props.orientation === "portrait" &&
                consumeCtxt.solved === false ? (
                  <>
                    <SpacedContainer color="lightblue">
                      <View
                        style={{
                          height: metaCtxt.dimensions.height * 0.16,
                        }}
                      >
                        <ScrollView style={{ flex: 1 }} ref={scrollRef}>
                          {practiceSequence[consumeCtxt.phase].text.length >
                          150 ? (
                            <Text
                              style={{
                                fontSize: metaCtxt.fontSizes.small,
                                opacity: 0.5,
                              }}
                            >
                              * You might need to scroll me *
                            </Text>
                          ) : null}

                          <Text style={{ fontSize: metaCtxt.fontSizes.std }}>
                            {practiceSequence[consumeCtxt.phase].text}
                          </Text>

                          <Text />
                          {consumeCtxt.phase < 6 || consumeCtxt.phase === 8 ? (
                            <Button
                              title="NEXT"
                              onPress={() => {
                                consumeCtxt.incrementPhase();
                              }}
                            />
                          ) : null}
                        </ScrollView>
                      </View>
                    </SpacedContainer>
                  </>
                ) : null}
                <Animated.View style={styles.gameContainer}>
                  <GameGrid />
                </Animated.View>
              </Animated.View>

              {props.orientation === "landscape" &&
              consumeCtxt.solved === false ? (
                <Animated.View style={styles.nonViewShot}>
                  <SpacedContainer color="lightblue">
                    <Text style={{ fontSize: metaCtxt.fontSizes.std }}>
                      {practiceSequence[consumeCtxt.phase].text}
                    </Text>
                    {consumeCtxt.phase < 6 || consumeCtxt.phase === 8 ? (
                      <Button
                        title="NEXT"
                        onPress={() => {
                          consumeCtxt.incrementPhase();
                        }}
                      />
                    ) : null}
                  </SpacedContainer>
                  <View
                    style={{ height: "50%", justifyContent: "space-evenly" }}
                  >
                    <BtmRow
                      landscape={false}
                      ids={["b0", "b1", "b2", "b3", "b4", "b5"]}
                    />
                  </View>
                </Animated.View>
              ) : (
                <Animated.View style={styles.nonViewShot}>
                  <BtmRow ids={["b0", "b1", "b2", "b3", "b4", "b5"]} />
                </Animated.View>
              )}
            </>
          )}
          <PostPracticeModal
            modalVisible={modalVisible}
            lettersEarned={["G", "D", "W", "R", "K"]}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
