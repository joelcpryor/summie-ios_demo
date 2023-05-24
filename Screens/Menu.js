import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";

import SpacedContainer from "../OtherComponents/SpacedContainer";
import SettingsModal from "../OtherComponents/SettingsModal";
import hoursToReset from "../Functions/hoursToReset";
import MenuHeader from "../OtherComponents/Menu-Header";
import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";
import MenuModal from "../OtherComponents/MenuModal";
import DiffSelection from "../OtherComponents/DiffSelection";
import MenuCarousel from "../OtherComponents/MenuCarousel";

import { MetaContext } from "../App";

export default function Menu() {
  ////    ////    inits     ////    ////
  const navigation = useNavigation();
  const consumeCtxt = useContext(MetaContext);
  const isFocused = useIsFocused();
  const snackRef = {
    easy: "snack0",
    not_so_easy: "snack1",
    slightly_stressful: "snack2",
    kinda_hard: "snack3",
  };
  const animationA = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    })
  ).current;

  ////    ////    states      ////    ////
  const [headerReady, setHeaderReady] = useState(true);
  const [selectedDiff, setSelectedDiff] = useState("easy");
  const [selectedMode, setSelectedMode] = useState("classic");
  const [diffDisplay, setDiffDisplay] = useState("EASY");
  const [trackColor, setTrackColor] = useState("#ff2511");
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [timeDiffHours, setTimeDiffHours] = useState("...");
  const [snack, setSnack] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [orient, setOrient] = useState("portrait");

  ////    ////    functions   ////    ////
  const handleOrientationChange = () => {
    const newOrientation =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "landscape"
        : "portrait";
    setOrient(newOrientation);
  };

  const changeSelectedDiff = (val) => {
    if (val === 0) {
      setSelectedDiff("easy");
      setDiffDisplay("EASY");
      setTrackColor(consumeCtxt.colourScheme.red);
    } else if (val === 1) {
      setSelectedDiff("not_so_easy");
      setDiffDisplay("NOT SO EASY");
      setTrackColor(consumeCtxt.colourScheme.orange);
    } else if (val === 2) {
      setSelectedDiff("slightly_stressful");
      setDiffDisplay("SLIGHTLY STRESSFUL");
      setTrackColor(consumeCtxt.colourScheme.yellow);
    } else if (val === 3) {
      setSelectedDiff("kinda_hard");
      setDiffDisplay("KINDA HARD");
      setTrackColor(consumeCtxt.colourScheme.green);
    } else if (val === 4) {
      setSelectedDiff("pretty_damn_tricky");
      setDiffDisplay("PRETTY DAMN TRICKY");
      setTrackColor(consumeCtxt.colourScheme.blue);
    } else if (val === 5) {
      setSelectedDiff("break_my_brain");
      setDiffDisplay("BREAK MY BRAIN");
      setTrackColor(consumeCtxt.colourScheme.violet);
    }
  };

  const toggleSettingsModal = (arg) => {
    if (arg === "show") {
      setSettingsModalVisible(true);
    } else {
      setSettingsModalVisible(false);
    }
  };

  const changeSelectedMode = (arg) => {
    if (arg === 0) {
      setSelectedMode("classic");
    } else if (arg === 1) {
      setSelectedMode("snack");
    }
  };

  const revertMenu = () => {
    setSnack(null);
    setSelectedMode("classic");
  };

  const initGame = async () => {
    try {
      if (selectedMode === "snack" && consumeCtxt.bonuses <= 0) {
        alert("This mode can only be played when the Powerplay is active.");
      } else {
        if (snack === false) {
          navigation.navigate("Game", {
            diff: selectedDiff,
            snack: false,
          });
        } else {
          navigation.navigate("Game", {
            diff: snackRef[selectedDiff],
            snack: true,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  ////    ////    useEffect     ////    ////
  useEffect(() => {
    async function init() {
      if (consumeCtxt.newUser === true) {
        setTimeout(() => {
          setModalVisible(true);
        }, 1000);
      }
      //  Check internet connection to determine which features are accessible.
      const connected = await consumeCtxt.checkConnection();
      //  If deadline has elapsed, run initWotw().
      const currentTime = Date.now();
      if (currentTime >= consumeCtxt.deadline && connected == true) {
        setHeaderReady(false);
        //  initWotw() calls the server and returns an array of three elements: the new word, the new deadline, and the most up to date version of the app.
        const newWord = await consumeCtxt.initWotw();
        //  Sync these values with asyncstorage and reset @letters to an empty array.
        if (consumeCtxt.points < consumeCtxt.pointThreshold) {
          await AsyncStorage.setItem("@weeksSurvived", "0");
        }
        await AsyncStorage.setItem("@wotw", newWord[0]);
        await AsyncStorage.setItem("@deadline", newWord[1].toString());
        await AsyncStorage.setItem("@letters", "[]");
        await AsyncStorage.setItem("@points", "0");
        await AsyncStorage.setItem(
          "@pointThreshold",
          consumeCtxt.nextPointThreshold.toString()
        );
        //  Sync async with global state (updateWotw() handles both @wotw and @deadline).
        await consumeCtxt.initData();
        //  Check if updates are available.
        if (newWord[2].ios !== Application.nativeApplicationVersion) {
          Alert.alert(
            "New update available!",
            "Download the latest version of Summie to access a bunch of new and improved features!"
          );
        }
        //  Re-render header.
        setTimeDiffHours(await hoursToReset(consumeCtxt.deadline));
        setHeaderReady(true);
      } else {
        setTimeDiffHours(await hoursToReset(consumeCtxt.deadline));
        //  wotw, deadline and letters have already been set, so no further action is required.
        //  wotw and deadline are out of sync but this is OK because the LetterBox screen is not accessible.
      }
    }

    init();
  }, [isFocused]);

  useEffect(() => {
    if (snack !== null) {
      setSelectedDiff("easy");
      setDiffDisplay("EASY");
      setTrackColor(consumeCtxt.colourScheme.red);
    }
  }, [snack]);

  useEffect(() => {
    handleOrientationChange();

    if (consumeCtxt.dimensions.height <= 812) {
      setImageHeight(200);
      setImageWidth(300);
    } else if (
      consumeCtxt.dimensions.height > 812 &&
      consumeCtxt.dimensions.height < 932
    ) {
      setImageHeight(220);
      setImageWidth(330);
    } else if (
      consumeCtxt.dimensions.height >= 932 &&
      consumeCtxt.dimensions.height < 1133
    ) {
      setImageHeight(240);
      setImageWidth(360);
    } else if (consumeCtxt.dimensions.height >= 1133) {
      setImageHeight(360);
      setImageWidth(540);
    }

    setTimeout(() => {
      fadeIn.start();
    }, 1000);
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

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 10,
      opacity: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
    footerRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    footerText: {
      fontSize: consumeCtxt.fontSizes.subHeader,
      color: "white",
      fontWeight: "300",
    },
    otherBtns: {
      padding: 8,
      backgroundColor: "lightblue",
      borderRadius: 4,
      alignItems: "center",
    },
    littleDot: {
      height: 8,
      width: 8,
      backgroundColor: "white",
      borderRadius: 90,
      margin: 2,
    },
    bigDot: {
      height: 12,
      width: 12,
      backgroundColor: "white",
      borderRadius: 90,
      margin: 2,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../assets/fall2.jpg")}>
        <GlobalStatusBar />
        <Animated.View style={styles.parentContainer}>
          <MenuHeader
            headerReady={headerReady}
            toggleSettingsModal={toggleSettingsModal}
            orient={orient}
            timeDiffHours={timeDiffHours}
          />
          {orient === "portrait" ? (
            <SpacedContainer color={trackColor}>
              {consumeCtxt.points < consumeCtxt.pointThreshold &&
              timeDiffHours > 0 ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: consumeCtxt.fontSizes.std,
                    margin: 5,
                  }}
                >
                  You need{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {consumeCtxt.pointThreshold - consumeCtxt.points} points
                  </Text>{" "}
                  in{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {timeDiffHours === 1
                      ? `${timeDiffHours} hour`
                      : `${timeDiffHours} hours`}
                  </Text>{" "}
                  to survive the week!
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: consumeCtxt.fontSizes.std,
                    margin: 5,
                  }}
                >
                  Points earned this week:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {consumeCtxt.points}
                  </Text>
                </Text>
              )}
            </SpacedContainer>
          ) : null}

          <SpacedContainer
            height={consumeCtxt.dimensions.height * 0.45}
            width="96%"
            color="rgba(0,0,0,0.8)"
            aI="center"
            jC="space-around"
          >
            {snack !== null ? (
              <DiffSelection
                initGame={initGame}
                changeSelectedDiff={changeSelectedDiff}
                trackColor={trackColor}
                diffDisplay={diffDisplay}
                selectedDiff={selectedDiff}
                snack={snack}
                revertMenu={revertMenu}
              />
            ) : (
              <>
                <Text
                  style={{
                    fontSize: consumeCtxt.fontSizes.subHeader,
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "lightgrey",
                  }}
                >
                  Swipe to select mode
                </Text>
                <MenuCarousel
                  changeSelectedMode={changeSelectedMode}
                  imgHeight={imageHeight}
                  imgWidth={imageWidth}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: imageWidth,
                  }}
                >
                  <View
                    style={
                      selectedMode === "classic"
                        ? styles.bigDot
                        : styles.littleDot
                    }
                  ></View>
                  <View
                    style={
                      selectedMode === "snack"
                        ? styles.bigDot
                        : styles.littleDot
                    }
                  ></View>
                </View>
                {selectedMode === "snack" && consumeCtxt.bonuses <= 0 ? (
                  <Text
                    style={{
                      fontSize: consumeCtxt.fontSizes.std,
                      color: "white",
                      opacity: 0.5,
                    }}
                  >
                    Activate Powerplay to unlock this mode.
                  </Text>
                ) : (
                  <TouchableOpacity
                    style={styles.otherBtns}
                    onPress={() => {
                      if (selectedMode === "classic") {
                        setSnack(false);
                      } else if (selectedMode === "snack") {
                        setSnack(true);
                      }
                    }}
                  >
                    <Text style={{ fontSize: consumeCtxt.fontSizes.std }}>
                      Select
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </SpacedContainer>

          {orient === "portrait" ? (
            <SpacedContainer
              height={consumeCtxt.dimensions.height * 0.18}
              width="96%"
              color="rgba(0,0,0,0.85)"
              aI="center"
              jC="space-evenly"
            >
              <View style={styles.footerRow}>
                <Text
                  style={{
                    fontSize: consumeCtxt.fontSizes.std,
                    color: "white",
                  }}
                >
                  Never played before?
                </Text>
                <Button
                  title="PRACTICE!"
                  color="gold"
                  onPress={() => {
                    navigation.navigate("Practice", {
                      diff: "practice",
                    });
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                  width: "96%",
                  marginVertical: 5,
                }}
              />
              {consumeCtxt.bonuses <= 0 ? (
                <>
                  <Text
                    style={{
                      fontSize: consumeCtxt.fontSizes.std,
                      color: "white",
                    }}
                  >
                    Falling behind?
                  </Text>
                  <Button
                    title="ACTIVATE POWERPLAY!"
                    color={trackColor}
                    onPress={() => {
                      if (consumeCtxt.netConnection === true) {
                        navigation.navigate("Powerplay");
                      } else {
                        alert(
                          "This feature requires an active internet connection."
                        );
                      }
                    }}
                  />
                </>
              ) : (
                <Text
                  style={{ fontSize: consumeCtxt.fontSizes.std, color: "grey" }}
                >
                  {consumeCtxt.bonuses === 1
                    ? `Powerplay enabled for one more puzzle.`
                    : `Powerplay enabled for the next ${consumeCtxt.bonuses} puzzles.`}
                </Text>
              )}
            </SpacedContainer>
          ) : (
            <SpacedContainer
              color="rgba(0,0,0,0.85)"
              aI="center"
              jC="space-evenly"
              width="96%"
            >
              <Button
                title="PRACTICE!"
                color="gold"
                onPress={() => {
                  navigation.navigate("Practice", {
                    diff: "practice",
                  });
                }}
              />
              {consumeCtxt.bonuses <= 0 ? (
                <Button
                  title="ACTIVATE POWERPLAY!"
                  color={trackColor}
                  onPress={() => {
                    if (consumeCtxt.netConnection === true) {
                      navigation.navigate("Powerplay");
                    } else {
                      alert(
                        "This feature requires an active internet connection."
                      );
                    }
                  }}
                />
              ) : null}
            </SpacedContainer>
          )}

          <MenuModal modalVisible={modalVisible} />
          <SettingsModal
            modalVisible={settingsModalVisible}
            toggleSettingsModal={toggleSettingsModal}
          />
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}
