import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  SafeAreaView,
} from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

import LetterRow from "../OtherComponents/LetterBox-LetterRow";
import WotwDisplay from "../OtherComponents/LetterBox-WotwDisplay";
import WordSubmitView from "../OtherComponents/LetterBox-WordSubmitView";
import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";
import parseArray from "../Functions/parseArray";
import amendArray from "../Functions/amendArray";
import hoursToReset from "../Functions/hoursToReset";
import { alphabet } from "../Functions/Objects";
import playSound from "../Functions/sfx";

export const LetterContext = React.createContext(null);
import { MetaContext } from "../App";

export default function LetterBoxScreen() {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);

  //    The only component being animated at this level is the scrollview. It controls opacity and height.
  const animationA = useRef(new Animated.Value(0)).current;
  const scrollViewOpen = useRef(
    Animated.timing(animationA, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    })
  ).current;
  const scrollViewClose = useRef(
    Animated.timing(animationA, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: false,
    })
  ).current;
  const rewardStructure = [
    ["3-5 letters", "5 points"],
    ["6-8 letters", "15 points"],
    ["9-11 letters", "30 points"],
  ];

  ////      ////        states      ////        ////
  const [isReady, setIsReady] = useState(false);
  const [sVSetting, setSVSetting] = useState("preInit");
  const [sVText, setSVText] = useState([]);
  const [lettersToMap, setLettersToMap] = useState([]);
  const [uidsToMap, setUidsToMap] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [locked, setLocked] = useState("");
  const [fadeLetter, setFadeLetter] = useState("");
  const [wordToSubmit, setWordToSubmit] = useState("");
  const [wotwArray, setWotwArray] = useState([]);
  const [wotwString, setWotwString] = useState("");
  const [wotwSolved, setWotwSolved] = useState(false);
  const [btnOpacity, setBtnOpacity] = useState(0.25);
  const [btnBOpacity, setBtnBOpacity] = useState(1);
  const [timeDiffHours, setTimeDiffHours] = useState(null);

  ////    ////    hooks     ////    ////

  ////      ////    functions       ////    ////
  const initLetters = async (arr) => {
    //  Call imported function parseArray, which always takes consumeCtxt.letters.
    const result = await parseArray(arr);

    return new Promise((resolve, reject) => {
      try {
        setLettersToMap(result[0]);
        setUidsToMap(result[1]);
        setWotwString(consumeCtxt["wotw"]);
        setWotwArray(consumeCtxt["wotw"].split(""));
        resolve();
      } catch (err) {
        console.log(err);
      }
    });
  };

  const getBannerSize = () => {
    if (consumeCtxt.dimensions.width >= 480) {
      return BannerAdSize.ANCHORED_ADAPTIVE_BANNER;
    } else {
      //  A_A_B is a bit weird on smaller devices, so just use the fixed BANNER size.
      return BannerAdSize.BANNER;
    }
  };

  const openSV = () => {
    //  Disable inputs (onPress only accepted when btnOpacity == 1).
    setBtnOpacity(0.25);
    //  Initiate scrollview animation.
    scrollViewOpen.start();
    //  When scrollview expansion is complete ...
    setTimeout(() => {
      //  Prompt conditional re-render of scrollview component.
      setSVSetting("open");
      //  Pass data sequentially to LetterSelect component.
      for (let i = 0; i < alphabet.length; i++) {
        setTimeout(() => {
          setFadeLetter(alphabet[i]);
          if (i == alphabet.length - 1) {
            //  Once all letters have been presented, enable inputs.
            setBtnOpacity(1);
            setSVText("");
          }
        }, i * 100);
      }
    }, 2100);
  };

  const closeSV = () => {
    //  Disable inputs.
    setBtnOpacity(0.25);
    setTimeout(() => {
      //  Initiate scrollview animation.
      scrollViewClose.start();
      //  When scrollview contraction is complete ...
      setTimeout(() => {
        //  Prompt conditional re-render.
        setSVSetting("closed");
      }, 2500);
    }, 250);
  };

  const letterPress = (id, letter) => {
    //  Called onPress from LetterSelect.
    if (id !== null && letter !== null) {
      //  If valid values have been passed, sync with state.
      setSelectedId(id);
      setSelectedLetter(letter);
    } else {
      //  Reset state.
      setSelectedId("");
      setSelectedLetter("");
    }
  };

  const useLetter = () => {
    //  Called onPress from .scrollViewHeader.
    if (selectedId !== "" && selectedLetter !== "") {
      playSound("letter-select");
      //  If a letter has been pressed and is highlighted.
      setLocked(selectedId);
      setWordToSubmit((prev) => prev + selectedLetter);
      //    Reset selected state.
      setSelectedLetter("");
      setSelectedId("");
    }
  };

  const resetWord = () => {
    //  Called onPress from WordSubmitContainer.
    setSelectedId("");
    setSelectedLetter("");
    setLocked("");
    setWordToSubmit("");
  };

  const submitWord = () => {
    //  Called onPress from WordSubmitContainer.
    //  This function returns either "correct" or "incorrect", which the child component uses to control its animations.
    return new Promise((resolve, reject) => {
      try {
        //  Disable inputs.
        setBtnOpacity(0.25);
        if (wordToSubmit.length < 3) {
          //  Reject if word is too short.
          alert("Word must be at least three characters in length.");
          setBtnOpacity(1);
          resolve("incorrect");
        } else {
          //  If word is long enough ...
          Axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSubmit}`
          )
            .then((response) => {
              handleCorrect();
              resolve("correct");
            })
            .catch((err) => {
              resolve("incorrect");
              setBtnOpacity(1);
            });
        }
      } catch (err) {
        console.log(err);
        alert("Error submitting word. Are you connected to the internet?");
        reject();
      }
    });
  };

  const handleCorrect = () => {
    //  Close the scrollview regardless.
    closeSV();
    playSound("word-submitted", consumeCtxt.mute);

    setTimeout(() => {
      if (wordToSubmit === wotwString) {
        setSVText(["You did it!", "Receiving 100 points!"]);
        rewardUser(100);
      } else {
        if (wordToSubmit.length <= 5) {
          setSVText(["Well done!", "Receiving 5 points ..."]);
          rewardUser(5);
        } else if (wordToSubmit.length > 5 && wordToSubmit.length <= 8) {
          setSVText(["Look at you go!", "Receiving 15 points  ..."]);
          rewardUser(15);
        } else if (wordToSubmit.length > 8) {
          setSVText(["Holy smokes!", "Receiving 30 points ..."]);
          rewardUser(30);
        }
      }
    }, 2500);
  };

  const rewardUser = async (pointQty) => {
    const newPoints = consumeCtxt.points + pointQty;
    const newArray = await amendArray(wordToSubmit, consumeCtxt.letters);
    let confetti = false;
    //  Sync @letters with `letters`.
    await AsyncStorage.setItem("@letters", JSON.stringify(newArray));
    //  If user has just survived the week, increment weeksSurvived.
    if (consumeCtxt.points < consumeCtxt.pointThreshold) {
      if (newPoints >= consumeCtxt.pointThreshold) {
        await AsyncStorage.setItem(
          "@weeksSurvived",
          (consumeCtxt.weeksSurvived + 1).toString()
        );
        confetti = true;
      }
    }
    //  Increase points.
    await AsyncStorage.setItem("@points", newPoints.toString());
    //  If current points + earned points exceeds existing high score, increase high score.
    if (newPoints > consumeCtxt.highScore) {
      await AsyncStorage.setItem("@highScore", newPoints.toString());
    }
    //  Sync all async and global state variables simultaneously.
    await consumeCtxt.initData();
    await initLetters(consumeCtxt.letters);

    if (confetti === true) {
      setTimeout(() => {
        setSVText(["Congratulations!", "You survived another week!"]);
        playSound("wotw-solved", consumeCtxt.mute);
      }, 1000);

      setTimeout(() => {
        setWotwSolved(true);
        setTimeout(() => {
          setWotwSolved(false);
          resetWord();
          openSV();
        }, 4000);
      }, 4000);
    } else {
      setTimeout(() => {
        resetWord();
        openSV();
      }, 2000);
    }
  };

  ////      ////        useEffects      ////        ////
  useEffect(() => {
    async function init() {
      await initLetters(consumeCtxt.letters);
      setTimeDiffHours(await hoursToReset(consumeCtxt.deadline));
      setIsReady(true);
    }

    init();
  }, []);

  ////      ////     styles     ////        ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    scrollViewContainer: {
      height: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: ["40%", "45%"],
      }),
      width: "100%",
      maxWidth: 1000,
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    headerContainer: {
      width: "100%",
      minHeight: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    scrollViewHeader: {
      height: "20%",
      width: "100%",
      maxHeight: consumeCtxt.dimensions.height * 0.1,
      justifyContent: "center",
      backgroundColor: "black",
      opacity: 0.8,
      padding: 5,
    },
    scrollViewContent: {
      height: "75%",
      width: "98%",
      justifyContent: "space-evenly",
      paddingBottom: 5,
    },
    scrollViewText: {
      color: "lightgrey",
      textAlign: "center",
      opacity: animationA.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      fontSize: consumeCtxt.fontSizes.std,
    },
    scrollViewRow: {
      width: "100%",
      flexDirection: "row",
    },
    submitBtn: {
      padding: 8,
      borderWidth: 2,
      borderRadius: 16,
      alignSelf: "flex-end",
      opacity: btnOpacity,
    },
    headerTxt: {
      color: "white",
      fontStyle: "italic",
      fontSize: consumeCtxt.fontSizes.small,
    },
  });

  ////      ////        component       ////        ////
  return (
    <LetterContext.Provider
      value={{ selectedId, locked, fadeLetter, letterPress }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require("../assets/fall1.jpg")}>
          <GlobalStatusBar />
          <View style={styles.parentContainer}>
            <View style={styles.headerContainer}>
              {sVSetting === "preInit" ? (
                <View
                  style={{
                    width: "100%",
                    padding: 5,
                    backgroundColor: "#191970",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: consumeCtxt.fontSizes.small,
                      color: "white",
                    }}
                  >
                    Consecutive weeks survived: {consumeCtxt.weeksSurvived}
                  </Text>
                  <Text
                    style={{
                      fontSize: consumeCtxt.fontSizes.small,
                      color: "white",
                    }}
                  >
                    Most points in a single week: {consumeCtxt.highScore}
                  </Text>
                </View>
              ) : (
                <BannerAd
                  unitId="ca-app-pub-4156613766325791/1204305843"
                  size={getBannerSize()}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: consumeCtxt.targetedAds,
                  }}
                />
              )}
            </View>

            {isReady == false ? (
              <ActivityIndicator />
            ) : (
              <WotwDisplay wotwArray={wotwArray} />
            )}

            <Animated.View style={styles.scrollViewContainer}>
              <View style={styles.scrollViewHeader}>
                {sVSetting == "preInit" ? (
                  <TouchableOpacity
                    style={[
                      styles.submitBtn,
                      {
                        backgroundColor: "dodgerblue",
                        opacity: btnBOpacity,
                        borderWidth: 1,
                        borderColor: "white",
                      },
                    ]}
                    onPress={() => {
                      if (lettersToMap[0].length <= 1) {
                        alert(
                          "Solve your first puzzle to start earning letters!"
                        );
                      } else {
                        openSV();
                        setBtnBOpacity(0);
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: consumeCtxt.fontSizes.std,
                      }}
                    >
                      DISPLAY LETTERS
                    </Text>
                  </TouchableOpacity>
                ) : sVSetting == "open" ? (
                  <TouchableOpacity
                    style={[
                      styles.submitBtn,
                      { backgroundColor: "dodgerblue" },
                    ]}
                    onPress={() => {
                      if (btnOpacity == 1) {
                        useLetter();
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: consumeCtxt.fontSizes.std,
                      }}
                    >
                      USE LETTER
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={styles.scrollViewContent}>
                {sVSetting == "preInit" ? (
                  <>
                    <Animated.Text
                      style={[
                        styles.scrollViewText,
                        { fontSize: consumeCtxt.fontSizes.subHeader },
                      ]}
                    >
                      Submit words to gain points. You need{" "}
                      {consumeCtxt.pointThreshold} points to survive the week!
                    </Animated.Text>
                    <View></View>
                    <View style={{ width: "100%", padding: 5 }}>
                      <View style={styles.scrollViewRow}>
                        <View style={{ width: "50%" }}>
                          <Animated.Text
                            style={[
                              styles.scrollViewText,
                              { fontWeight: "bold" },
                            ]}
                          >
                            Word length
                          </Animated.Text>
                        </View>
                        <View style={{ width: "50%" }}>
                          <Animated.Text
                            style={[
                              styles.scrollViewText,
                              { fontWeight: "bold" },
                            ]}
                          >
                            Reward
                          </Animated.Text>
                        </View>
                      </View>

                      {rewardStructure.map((el, i) => {
                        return (
                          <View style={styles.scrollViewRow} key={i}>
                            <View style={{ width: "50%" }}>
                              <Animated.Text style={styles.scrollViewText}>
                                {el[0]}
                              </Animated.Text>
                            </View>
                            <View style={{ width: "50%" }}>
                              <Animated.Text style={styles.scrollViewText}>
                                {el[1]}
                              </Animated.Text>
                            </View>
                          </View>
                        );
                      })}
                      <View style={styles.scrollViewRow}>
                        <View style={{ width: "50%" }}>
                          <Animated.Text
                            style={[
                              styles.scrollViewText,
                              { color: "gold", fontWeight: "bold" },
                            ]}
                          >
                            Word of the Week
                          </Animated.Text>
                        </View>
                        <View style={{ width: "50%" }}>
                          <Animated.Text
                            style={[
                              styles.scrollViewText,
                              { color: "gold", fontWeight: "bold" },
                            ]}
                          >
                            100 points
                          </Animated.Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : sVSetting == "open" ? (
                  <Animated.ScrollView
                    style={{
                      opacity: animationA.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    }}
                  >
                    {lettersToMap.map((el, i) => {
                      return (
                        <LetterRow key={i} letters={el} uids={uidsToMap[i]} />
                      );
                    })}
                  </Animated.ScrollView>
                ) : sVSetting == "closed" ? (
                  <>
                    <Animated.Text
                      style={[styles.scrollViewText, { fontWeight: "bold" }]}
                    >
                      {sVText[0]}
                    </Animated.Text>
                    <Text></Text>
                    <Animated.Text style={styles.scrollViewText}>
                      {sVText[1]}
                    </Animated.Text>
                  </>
                ) : null}
              </View>
            </Animated.View>
            <WordSubmitView
              submitWord={submitWord}
              resetWord={resetWord}
              wordToSubmit={wordToSubmit}
              btnOpacity={btnOpacity}
              sVSetting={sVSetting}
            />
          </View>

          {wotwSolved === true ? (
            <ConfettiCannon
              count={200}
              explosionSpeed={100}
              fadeOut={true}
              origin={{ x: -10, y: 10 }}
            />
          ) : null}
        </ImageBackground>
      </SafeAreaView>
    </LetterContext.Provider>
  );
}
