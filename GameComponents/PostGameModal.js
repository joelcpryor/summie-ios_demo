import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MetaContext } from "../App";

import BonusDisplay from "../OtherComponents/BonusDisplay";
import ShareBox from "../OtherComponents/ShareBox";
import LetterCollect from "../OtherComponents/LetterCollect";
import {
  BannerAd,
  useInterstitialAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function PostGameModal(props) {
  ////    ////    inits   ////    ////
  const navigation = useNavigation();
  const consumeCtxt = useContext(MetaContext);
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    "ca-app-pub-4156613766325791/8752374717",
    {
      requestNonPersonalizedAdsOnly: consumeCtxt.targetedAds,
    }
  );

  ////    ////    states    ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [margin, setMargin] = useState(12);
  const [flexD, setFlexD] = useState("column");
  const [canExit, setCanExit] = useState(false);
  const [bonusDisplay, setBonusDisplay] = useState(false);

  ////    ////    functions   ////    ////
  const handleOrientationChange = () => {
    const fD =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "row"
        : "column";
    setFlexD(fD);
  };

  const registerAnimationComplete = () => {
    setCanExit(true);
  };

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    if (
      consumeCtxt.dimensions.width >= 600 &&
      consumeCtxt.dimensions.width < 811
    ) {
      setMargin(40);
    } else if (
      consumeCtxt.dimensions.width >= 811 &&
      consumeCtxt.dimensions.width < 900
    ) {
      setMargin(60);
    } else if (consumeCtxt.dimensions.width >= 900) {
      setMargin(100);
    }

    const rand = Math.floor(Math.random() * consumeCtxt.points);
    if (rand <= 4) {
      setBonusDisplay(true);
    }
  }, []);

  useEffect(() => {
    if (props.modalVisible == true) {
      setModalVisible(true);
    }
  }, [props.modalVisible]);

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
    // Start loading the interstitial straight away
    try {
      if (isLoaded === true) {
        //console.log("ad loaded");
      }
    } catch (err) {
      console.log(err);
    }
  }, [isLoaded]);

  useEffect(() => {
    try {
      if (isClosed === true) {
        navigation.navigate("Menu");
      }
    } catch (err) {
      console.log(err);
    }
  }, [isClosed]);

  useEffect(() => {
    try {
      load();
    } catch (err) {
      console.log(err);
    }
  }, [load]);

  ////    ////    styles    ////    ////
  const styles = StyleSheet.create({
    modal: {
      margin: margin,
      borderWidth: 2,
      borderRadius: 8,
    },
    modalContent: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 10,
      borderRadius: 8,
    },
    header: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: "gold",
    },
  });

  ////    ////    component   ////    ////
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.header,
                  fontWeight: "bold",
                }}
              >
                Well done!
              </Text>
            </View>

            <LetterCollect
              lettersEarned={props.lettersEarned}
              pointsEarned={props.pointsEarned}
              registerAnimationComplete={registerAnimationComplete}
              practice={false}
              isBonus={props.isBonus}
            />

            <View
              style={{
                flexDirection: flexD,
                width: "100%",
                height: "65%",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "lightblue",
              }}
            >
              {bonusDisplay === true && props.orientation === "portrait" ? (
                <BonusDisplay />
              ) : (
                <BannerAd
                  size={
                    consumeCtxt.dimensions.height < 670
                      ? BannerAdSize.BANNER
                      : BannerAdSize.MEDIUM_RECTANGLE
                  }
                  unitId="ca-app-pub-4156613766325791/4297373042"
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: consumeCtxt.targetedAds,
                  }}
                />
              )}

              <ShareBox picRoute={props.picRoute} />
            </View>

            {canExit === true ? (
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderWidth: 2,
                  borderRadius: 4,
                  backgroundColor: "lightgrey",
                }}
                onPress={() => {
                  const rand = Math.floor(Math.random() * 4);
                  if (rand === 0 && consumeCtxt.points >= 5) {
                    if (isLoaded === true) {
                      show();
                    } else {
                      navigation.navigate("Menu");
                    }
                  } else {
                    navigation.navigate("Menu");
                  }
                }}
              >
                <Text style={{ fontSize: consumeCtxt.fontSizes.std }}>
                  Return to menu
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ fontSize: consumeCtxt.fontSizes.std }}>
                Receiving letters ...
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
