import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MetaContext } from "../App";

import { Checkbox } from "expo-checkbox";

export default function MenuModal(props) {
  ////    ////    inits   ////    ////
  const consumeCtxt = useContext(MetaContext);

  ////    ////    states    ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [margin, setMargin] = useState(16);
  const [flexD, setFlexD] = useState("column");
  const [ageChecked, setAgeChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  ////    ////    functions   ////    ////
  const handleOrientationChange = () => {
    const fD =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "row"
        : "column";
    setFlexD(fD);
  };

  const handleSubmit = async () => {
    await AsyncStorage.setItem("@newUser", "false");
    if (ageChecked === true && consentChecked === true) {
      console.log("user is old enough and gives consent");
      //  Set async === false because this value is plugged into the `requestNonPersonalisedAdsOnly` prop of the Admob component. If this value === false, then personalised ads ARE shown.
      await AsyncStorage.setItem("@targetedAds", "false");
    }
    setModalVisible(false);
    consumeCtxt.updateAds();
  };

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    if (
      consumeCtxt.dimensions.width >= 600 &&
      consumeCtxt.dimensions.width < 800
    ) {
      setMargin(48);
    } else if (
      consumeCtxt.dimensions.width >= 800 &&
      consumeCtxt.dimensions.width < 900
    ) {
      setMargin(96);
    } else if (consumeCtxt.dimensions.width >= 900) {
      setMargin(120);
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

  ////    ////    styles    ////    ////
  const styles = StyleSheet.create({
    modal: {
      margin: margin,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "white",
      justifyContent: "center",
    },
    modalContent: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgb(0, 0, 20)",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: 10,
      borderRadius: 8,
    },
    qBox: {
      borderColor: "white",
      borderRadius: 16,
      borderWidth: 2,
      padding: 10,
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    qText: {
      fontSize: consumeCtxt.fontSizes.subHeader,
      color: "lightgreen",
    },
    otherText: {
      fontSize: consumeCtxt.fontSizes.std,
      fontStyle: "italic",
      color: "lightgrey",
      textAlign: "center",
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
            <Text
              style={{ fontSize: consumeCtxt.fontSizes.header, color: "gold" }}
            >
              Welcome, newbie!
            </Text>
            <Text style={styles.otherText}>
              As part of our commitment to user privacy, we only display
              personalised ads to consenting users over the age of 13.
            </Text>
            <Text style={styles.otherText}>
              You will still see ads if you do not tick both boxes, but the ads
              will be non-personalised and therefore less relevant.
            </Text>
            <View
              style={{
                height: "33%",
                width: "96%",
                flexDirection: flexD,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <View style={styles.qBox}>
                <Text style={styles.qText}>I confirm that I am aged 13+</Text>
                <Text />
                <Checkbox
                  value={ageChecked}
                  onValueChange={() => {
                    setAgeChecked((prev) => !prev);
                  }}
                />
              </View>
              <View style={styles.qBox}>
                <Text style={styles.qText}>I want to see personalised ads</Text>
                <Text />
                <Checkbox
                  value={consentChecked}
                  onValueChange={() => {
                    setConsentChecked((prev) => !prev);
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={{ backgroundColor: "lightgreen", padding: 10 }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.subHeader,
                  fontWeight: "bold",
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
            <Text style={styles.otherText}>
              Our full privacy policy is available at www.vibeshift.au/privacy
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
