import React, { useState, useEffect, useContext, useRef } from "react";
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

import SpacedContainer from "../OtherComponents/SpacedContainer";
import LetterBoxAd from "../OtherComponents/LetterBoxAd";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function PostGameModal(props) {
  ////    ////    inits   ////    ////
  const navigation = useNavigation();
  const consumeCtxt = useContext(MetaContext);
  const tallyRef = useRef(null);

  ////    ////    states    ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [margin, setMargin] = useState(18);
  const [flexD, setFlexD] = useState("column");
  const [canExit, setCanExit] = useState(false);
  const [bonusDisplay, setBonusDisplay] = useState(false);
  const [pointsTally, setPointsTally] = useState(null);

  ////    ////    functions   ////    ////
  const handleOrientationChange = () => {
    const fD =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "row"
        : "column";
    setFlexD(fD);
  };

  const startTally = () => {
    let tallyCurrent = 0;
    setPointsTally(0);
    if (props.pointsEarned > 0) {
      tallyRef.current = setInterval(() => {
        tallyCurrent++;
        if (tallyCurrent === props.pointsEarned) {
          clearInterval(tallyRef.current);
          setTimeout(() => {
            setCanExit(true);
          }, 1000);
        }
        setPointsTally(tallyCurrent);
      }, 200);
    } else {
      setTimeout(() => {
        setCanExit(true);
      }, 1000);
    }
  };

  const makeMeDisappear = () => {
    setModalVisible(false);
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
  }, []);

  useEffect(() => {
    if (props.modalVisible == true) {
      setModalVisible(true);
      setTimeout(() => {
        startTally();
      }, 1000);
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
      backgroundColor: "rgba(255,255,255, 0.95)",
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
            <View
              style={{
                width: "90%",
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "rgba(0,0,0,0.8)",
                borderRadius: 30,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.std,
                  color: "lightgrey",
                }}
              >
                You earned
              </Text>
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.biggest,
                  fontWeight: "bold",
                  color: "gold",
                  margin: 5,
                }}
              >
                {pointsTally}
              </Text>
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.std,
                  color: "lightgrey",
                }}
              >
                points!
              </Text>
            </View>

            <View
              style={{
                flexDirection: flexD,
                width: "100%",
                minHeight: "60%",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "skyblue",
              }}
            >
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
              <LetterBoxAd makeMeDisappear={makeMeDisappear} />
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
                  navigation.navigate("Menu");
                }}
              >
                <Text style={{ fontSize: consumeCtxt.fontSizes.std }}>
                  Return to menu
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
