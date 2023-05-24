import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRewardedAd, TestIds } from "react-native-google-mobile-ads";
import { Entypo } from "@expo/vector-icons";

import { MetaContext } from "../App";
import SpacedContainer from "../OtherComponents/SpacedContainer";

export default function Payment() {
  ////    ////    inits     ////    ////
  const consumeCtxt = useContext(MetaContext);
  const { isLoaded, isClosed, isOpened, isEarnedReward, load, reward, show } =
    useRewardedAd("ca-app-pub-4156613766325791/5262120295", {
      requestNonPersonalizedAdsOnly: consumeCtxt.targetedAds,
    });
  const navigation = useNavigation();
  const bonusQty = 3;

  ////    ////    states      ////    ////
  const [timeDiffMinutes, setTimeDiffMinutes] = useState(null);
  const [adAvailable, setAdAvailable] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageSize, setImageSize] = useState(150);
  const [orient, setOrient] = useState(null);

  ////    ////    functions     ////    ////

  const incrementThenRedirect = async () => {
    //  Set @credits to the sum of context variable and state variable, which is unchanged since before the purchase. For some reason it's necessary to parse creditQty into an integer before setting it in the form of a string. Otherwise 10 + 20 == 1020 instead of 30.
    try {
      await AsyncStorage.setItem("@bonuses", bonusQty.toString());
      const currentTime = Math.round(Date.now());
      await AsyncStorage.setItem("@lastAdView", currentTime.toString());
      await consumeCtxt.updateLav();
      await consumeCtxt.updateBonuses();
      navigation.navigate("Menu");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrientationChange = () => {
    const newOrientation =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "landscape"
        : "portrait";
    setOrient(newOrientation);
  };

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    handleOrientationChange();

    const currentTime = Math.round(Date.now());
    const timeDiff = currentTime - consumeCtxt.lastAdView;
    setTimeDiffMinutes(Math.floor(30 - (timeDiff % 1800000) / 60000));
    if (timeDiff >= 1800000) {
      setAdAvailable(true);
    }
    if (Dimensions.get("window").height > 812) {
      setImageSize(240);
    }
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
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed === true && isEarnedReward === true) {
      Alert.alert("Reward received!", `Powerplay is active.`);
      incrementThenRedirect();
    }
  }, [isClosed]);

  useEffect(() => {
    if (isLoaded === true) {
      setLoaded(true);
    }
  }, [isLoaded]);

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: orient === "portrait" ? "column" : "row",
    },
    header: {
      width: "100%",
      maxWidth: 430,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: 10,
    },
    btn: {
      padding: 10,
      backgroundColor: "lightgreen",
      borderWidth: 2,
      borderRadius: 8,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../assets/canva1.png")}>
        <StatusBar hidden={true} />
        <View style={styles.parentContainer}>
          <Image
            source={require("../assets/powerplay_ad.png")}
            resizeMode="contain"
            style={{
              height: consumeCtxt.dimensions.width * 0.9,
              width: consumeCtxt.dimensions.width * 0.9,
              minHeight: 500,
            }}
          />
          {loaded === true ? (
            <View style={styles.header}>
              {adAvailable === true ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      if (isLoaded === true) {
                        show();
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontSize: consumeCtxt.fontSizes.header,
                        fontWeight: "bold",
                      }}
                    >
                      Watch Video
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text
                  style={{
                    fontStyle: "italic",
                    color: "white",
                    fontSize: consumeCtxt.fontSizes.std,
                    textAlign: "center",
                  }}
                >
                  {timeDiffMinutes === 1
                    ? ` Sponsored video will refresh in 1 minute. `
                    : ` Sponsored video will refresh in ${timeDiffMinutes} minutes. `}
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.header}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: consumeCtxt.fontSizes.small,
                  color: "lightgrey",
                }}
              >
                {` Loading sponsored video ... `}
              </Text>
              <ActivityIndicator />
            </View>
          )}
          <Text />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
