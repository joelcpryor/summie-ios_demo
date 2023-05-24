import React, { useState } from "react";
import { Dimensions, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import * as Network from "expo-network";

import Game from "./Screens/Game";
import LetterBox from "./Screens/LetterBox";
import Menu from "./Screens/Menu";
import Payment from "./Screens/Payment";
import Practice from "./Screens/Practice";
import Welcome from "./Screens/Welcome";

export const MetaContext = React.createContext(null);

export default function App() {
  ////    ////    inits     ////    ////
  const Stack = createNativeStackNavigator();
  const server = "https://summie-server.herokuapp.com/";
  const colourScheme = {
    red: "#FF2511",
    orange: "#f69a09",
    yellow: "#e6e619",
    green: "limegreen",
    blue: "dodgerblue",
    violet: "#E73ADD",
  };

  ////    ////    states      ////    ////
  const [dimensions, setDimensions] = useState({});
  const [fontSizes, setFontSizes] = useState({});
  const [netConnection, setNetConnection] = useState(false);
  const [mute, setMute] = useState(false);
  //const [hintSetting, setHintSetting] = useState(null);

  const [letters, setLetters] = useState([]);
  const [wotw, setWotw] = useState("MALFUNCTION");
  const [deadline, setDeadline] = useState(0);
  const [lastAdView, setLastAdView] = useState(0);
  const [newUser, setNewUser] = useState(false);
  const [targetedAds, setTargetedAds] = useState(true);
  const [points, setPoints] = useState(0);
  const [bonuses, setBonuses] = useState(0);
  const [weeksSurvived, setWeeksSurvived] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pointThreshold, setPointThreshold] = useState(10);
  const [nextPointThreshold, setNextPointThreshold] = useState(11);

  ////    ////    functions     ////    ////
  const checkConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();

    return new Promise((resolve, reject) => {
      try {
        if (networkState.isConnected == true) {
          setNetConnection(true);
          resolve(true);
        } else if (networkState.isConnected == false) {
          setNetConnection(false);
          resolve(false);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const initSettings = async () => {
    const audioSettingAsync = await AsyncStorage.getItem("@audioSetting");
    const fontSettingAsync = await AsyncStorage.getItem("@fontSetting");
    //const hintSettingAsync = await AsyncStorage.getItem("@hintSetting");
    const nextPTAsync = await AsyncStorage.getItem("@nextPointThreshold");

    return new Promise((resolve, reject) => {
      try {
        const dX = Dimensions.get("window").width;
        const dY = Dimensions.get("window").height;
        //  Set height == to the greater dimension.
        if (dX >= dY) {
          setDimensions({
            width: dY,
            height: dX,
          });
        } else {
          setDimensions({
            width: dX,
            height: dY,
          });
        }

        if (nextPTAsync !== null) {
          setNextPointThreshold(parseInt(nextPTAsync));
        } else {
          setNextPointThreshold(100);
        }

        if (audioSettingAsync === "sound-off") {
          setMute(true);
        } else {
          setMute(false);
        }

        /*if (hintSettingAsync === "hide-hints") {
          setHintSetting(false);
        } else {
          setHintSetting(true);
        }*/

        //  Set default font sizes according to size of device.
        if (dX >= 812) {
          if (fontSettingAsync === "small") {
            setFontSizes({
              small: 14,
              std: 18,
              subHeader: 22,
              header: 26,
              biggest: 30,
            });
          } else {
            setFontSizes({
              small: 20,
              std: 24,
              subHeader: 28,
              header: 32,
              biggest: 36,
            });
          }
        } else if (dX < 812 && dX >= 480) {
          if (fontSettingAsync === "small") {
            setFontSizes({
              small: 12,
              std: 14,
              subHeader: 16,
              header: 20,
              biggest: 24,
            });
          } else {
            setFontSizes({
              small: 18,
              std: 21,
              subHeader: 24,
              header: 28,
              biggest: 32,
            });
          }
        } else if (dX < 480) {
          if (fontSettingAsync === "small") {
            setFontSizes({
              small: 8,
              std: 10,
              subHeader: 12,
              header: 16,
              biggest: 20,
            });
          } else {
            setFontSizes({
              small: 14,
              std: 16,
              subHeader: 18,
              header: 22,
              biggest: 26,
            });
          }
        }
        resolve([dX, dY]);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const initData = async () => {
    //  Called in Welcome. Executes during welcome screen animation.

    //  Then, sync async data with global variables.
    const values = await AsyncStorage.multiGet([
      "@letters",
      "@wotw",
      "@deadline",
      "@lastAdView",
      "@newUser",
      "@targetedAds",
      "@points",
      "@bonuses",
      "@highScore",
      "@weeksSurvived",
      "@pointThreshold",
    ]);

    return new Promise((resolve, reject) => {
      try {
        values.forEach((value) => {
          console.log(value[0] + " == " + value[1]);
          //  value[0] will always equal the name of the variable, and value[1] will equal either the variable's value, or null if no such variable exists.
          if (value[0] === "@letters") {
            if (value[1] !== null) {
              const lettersAsync = JSON.parse(value[1]);
              if (
                lettersAsync !== null &&
                lettersAsync !== undefined &&
                lettersAsync !== ""
              ) {
                setLetters(lettersAsync);
              }
            } else {
              //  If neither condition is met, `letters` remains an empty array.
              //  Both conditions will not be met until user earns their first letter.
            }
          } else if (value[0] === "@wotw") {
            if (
              value[1] !== null &&
              value[1] !== undefined &&
              value[1] !== ""
            ) {
              setWotw(value[1]);
            } else {
              //  If neither condition is met, `wotw` remains == "MALFUNCTION".
              //  `wotw` will be set equal to the current WOTW upon first render of the Menu screen.
            }
          } else if (value[0] === "@deadline") {
            if (value[1] !== null) {
              const deadlineAsync = parseInt(value[1]);
              if (!isNaN(deadlineAsync)) {
                setDeadline(deadlineAsync);
              }
            } else {
              //  If neither condition is met, `deadline` remains == 0.
              //  This is important because `initWotw()` is run in the Menu screen if the remote deadline value is >= the local one.
            }
          } else if (value[0] === "@lastAdView") {
            if (value[1] !== null) {
              const lastAdViewAsync = parseInt(value[1]);
              if (!isNaN(lastAdViewAsync)) {
                setLastAdView(lastAdViewAsync);
              }
            } else {
              //  If neither condition is met, `lastAdView` remains == 0.
              //  Ad is rendered on Payment screen if (current time - `lastAdView`) >= 1800000. Since (current time - 0) will always satisfy this condition, retaining the value of 0 is fine.
              //  `lastAdView` is then updated when the ad is viewed.
            }
          } else if (value[0] === "@newUser") {
            //  In this case, the absence of a value is taken as evidence that the user is new.
            if (value[1] === null) {
              setNewUser(true);
            } else {
              //  If a value exists, it will always == false, as that is the value to which the variable defaults when the user submits their response to the consent modal.
              //  Thus, if a value is present, @newUser will remain == false.
            }
          } else if (value[0] === "@targetedAds") {
            //  @targetedAds is plugged into the `requestNonPersonalizedAdsOnly` prop of the Admob components.
            //  For this reason, targeted advertising WILL be shown if @targetedAds == false (i.e. we do NOT want to request non-personalised ads only).
            if (value[1] !== null) {
              if (value[1] == "false" || value[1] == false) {
                console.log(
                  "@targetedAds == 'false', updating global state ..."
                );
                setTargetedAds(false);
              }
            } else {
              //  If neither condition is met, @targetedAds remains == true.
              //  This means that users will be shown non-personalised ads by default unless they opt in.
            }
          } else if (value[0] === "@points") {
            if (value[1] !== null) {
              const pointsAsync = parseInt(value[1]);
              if (!isNaN(pointsAsync)) {
                setPoints(pointsAsync);
              }
            } else {
              //  If neither condition is met, points remains == 0.
            }
          } else if (value[0] === "@bonuses") {
            if (value[1] !== null) {
              const bonusesAsync = parseInt(value[1]);
              if (!isNaN(bonusesAsync)) {
                setBonuses(bonusesAsync);
              }
            } else {
              //  If neither condition is met, bonuses remains == 0.
            }
          } else if (value[0] === "@highScore") {
            if (value[1] !== null) {
              const highScoreAsync = parseInt(value[1]);
              if (!isNaN(highScoreAsync)) {
                setHighScore(highScoreAsync);
              }
            } else {
              //  If neither condition is met, highScore remains == 0.
            }
          } else if (value[0] === "@weeksSurvived") {
            if (value[1] !== null) {
              const weeksSurvivedAsync = parseInt(value[1]);
              if (!isNaN(weeksSurvivedAsync)) {
                setWeeksSurvived(weeksSurvivedAsync);
              }
            } else {
              //  If neither condition is met, weeksSurvived remains == 0.
            }
          } else if (value[0] === "@pointThreshold") {
            if (value[1] !== null) {
              const pTAsync = parseInt(value[1]);
              if (!isNaN(pTAsync)) {
                setPointThreshold(pTAsync);
              }
            } else {
              //  If neither condition is met, pointThreshold remains == 100.
            }
          }
        });
        resolve();
      } catch (err) {
        console.log(err);
      }
    });
  };

  const initWotw = async () => {
    try {
      const response = await Axios.get(`${server}game/get-word-of-week`);

      return new Promise((resolve, reject) => {
        resolve([
          response.data.word,
          response.data.deadline,
          response.data.version,
        ]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateFontSetting = (async = () => {
    try {
    } catch (err) {
      console.log(err);
    }
  });

  const updatePoints = async () => {
    try {
      const newPoints = await AsyncStorage.getItem("@points");
      setPoints(parseInt(newPoints));
    } catch (err) {
      console.log(err);
    }
  };

  const updateHighScore = async () => {
    try {
      const newHighScore = await AsyncStorage.getItem("@highScore");
      setHighScore(parseInt(newHighScore));
    } catch (err) {
      console.log(err);
    }
  };

  const updateLetters = async () => {
    try {
      const newLetters = await AsyncStorage.getItem("@letters");
      setLetters(JSON.parse(newLetters));
    } catch (err) {
      console.log(err);
    }
  };

  const updateBonuses = async () => {
    try {
      const newBonuses = await AsyncStorage.getItem("@bonuses");
      setBonuses(parseInt(newBonuses));
    } catch (err) {
      console.log(err);
    }
  };

  const updateWotw = async () => {
    try {
      const newWotw = await AsyncStorage.getItem("@wotw");
      setWotw(newWotw);
      const newDeadline = await AsyncStorage.getItem("@deadline");
      setDeadline(parseInt(newDeadline));
    } catch (err) {
      console.log(err);
    }
  };

  const updateLav = async () => {
    try {
      const newLav = await AsyncStorage.getItem("@lastAdView");
      setLastAdView(parseInt(newLav));
    } catch (err) {
      console.log(err);
    }
  };

  const updateMute = (input) => {
    try {
      if (input === "sound-on") {
        setMute(false);
      } else {
        setMute(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateAds = async () => {
    try {
      setNewUser(false);
      const newTargetedAds = await AsyncStorage.getItem("@targetedAds");
      if (newTargetedAds == "false" || newTargetedAds == false) {
        setTargetedAds(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateWeeksSurvived = async () => {
    const newWS = await AsyncStorage.getItem("@weeksSurvived");
    setWeeksSurvived(parseInt(newWS));
  };

  ////    ////    component     ////    ////
  return (
    <MetaContext.Provider
      value={{
        initSettings,
        dimensions,
        fontSizes,
        colourScheme,
        initData,
        points,
        pointThreshold,
        nextPointThreshold,
        letters,
        wotw,
        deadline,
        lastAdView,
        newUser,
        targetedAds,
        bonuses,
        weeksSurvived,
        highScore,
        weeksSurvived,
        checkConnection,
        netConnection,
        updateMute,
        mute,
        updateLetters,
        updateWotw,
        updateLav,
        updateBonuses,
        updatePoints,
        updateHighScore,
        updateAds,
        updateWeeksSurvived,
        initWotw,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome!" component={Welcome} />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="My LetterBox" component={LetterBox} />
          <Stack.Screen name="Powerplay" component={Payment} />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Practice" component={Practice} />
        </Stack.Navigator>
      </NavigationContainer>
    </MetaContext.Provider>
  );
}
