import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MetaContext } from "../App";

import { Checkbox } from "expo-checkbox";
import { Picker, NumberInput } from "react-native-ui-lib";

export default function SettingsModal(props) {
  ////    ////    inits   ////    ////
  const consumeCtxt = useContext(MetaContext);
  const fontRef = ["std", "small"];
  const inputRef = useRef(null);

  ////    ////    states    ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [margin, setMargin] = useState(16);
  const [muteAudio, setMuteAudio] = useState(null);
  const [targetAds, setTargetAds] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [newPT, setNewPT] = useState(null);

  ////    ////    functions   ////    ////

  const handleSubmit = async () => {
    try {
      if (isNaN(newPT) || newPT < 100 || newPT > 7000) {
        alert(
          "Enter a valid number between 100 and 7000 in the 'points threshold' field, or hit Reset to revert to original value."
        );
      } else {
        setWaiting(true);

        if (muteAudio === true) {
          await AsyncStorage.setItem("@audioSetting", "sound-off");
        } else {
          await AsyncStorage.setItem("@audioSetting", "sound-on");
        }

        if (targetAds === true) {
          await AsyncStorage.setItem("@targetedAds", "false");
        } else {
          await AsyncStorage.setItem("@targetedAds", "true");
        }

        await AsyncStorage.setItem("@nextPointThreshold", newPT.toString());

        await AsyncStorage.setItem("@fontSetting", fontRef[fontSize]);
        consumeCtxt.updateAds();
        consumeCtxt.initSettings();
        setTimeout(() => {
          setWaiting(false);
          props.toggleSettingsModal("hide");
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    setNewPT(consumeCtxt.nextPointThreshold);

    if (consumeCtxt.dimensions.width >= 700) {
      setMargin(40);
    }

    if (consumeCtxt.targetedAds === false) {
      setTargetAds(true);
    } else {
      setTargetAds(false);
    }

    if (consumeCtxt.mute === true) {
      setMuteAudio(true);
    } else {
      setMuteAudio(false);
    }

    if (
      consumeCtxt.fontSizes.biggest === 36 ||
      consumeCtxt.fontSizes.biggest === 32 ||
      consumeCtxt.fontSizes.biggest === 26
    ) {
      setFontSize(0);
    } else {
      setFontSize(1);
    }
  }, []);

  useEffect(() => {
    if (props.modalVisible == true) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [props.modalVisible]);

  /*useEffect(() => {
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
  }, []);*/

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
      backgroundColor: "rgb(0,0,20)",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: 10,
      borderRadius: 8,
    },
    qBox: {
      flexDirection: "row",
      width: "96%",
      borderColor: "white",
      borderRadius: 16,
      borderWidth: 2,
      padding: 8,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    qText: {
      fontSize: consumeCtxt.fontSizes.std,
      color: "lightgreen",
    },
    otherText: {
      fontSize: consumeCtxt.fontSizes.small,
      fontStyle: "italic",
      color: "lightgrey",
      textAlign: "center",
      margin: 5,
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
            {waiting === true ? (
              <ActivityIndicator />
            ) : (
              <>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: consumeCtxt.fontSizes.header,
                      color: "grey",
                    }}
                  >
                    Settings
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "lightblue",
                      padding: 8,
                      borderRadius: 8,
                    }}
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        fontSize: consumeCtxt.fontSizes.subHeader,
                        fontWeight: 300,
                      }}
                    >
                      Save and exit
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.qBox}>
                  <Text style={styles.qText}>Mute audio:</Text>
                  <Checkbox
                    value={muteAudio}
                    onValueChange={() => {
                      setMuteAudio((prev) => !prev);
                    }}
                  />
                </View>
                <View style={styles.qBox}>
                  <Text style={styles.qText}>Show personalised ads:</Text>
                  <Checkbox
                    value={targetAds}
                    onValueChange={() => {
                      setTargetAds((prev) => !prev);
                    }}
                  />
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View style={styles.qBox}>
                    <Text style={styles.qText}>Points threshold: </Text>
                    <TextInput
                      style={{
                        backgroundColor: "white",
                        textAlign: "center",
                        fontSize: consumeCtxt.fontSizes.std,
                      }}
                      onChangeText={(e) => {
                        setNewPT(e);
                      }}
                      ref={inputRef}
                      placeholder={consumeCtxt.nextPointThreshold.toString()}
                      minWidth={100}
                      maxLength={4}
                      keyboardType="numeric"
                    />
                    <Button
                      title="Reset"
                      onPress={() => {
                        inputRef.current.clear();
                        setNewPT(consumeCtxt.nextPointThreshold);
                      }}
                    />
                  </View>
                  <Text style={styles.otherText}>
                    Challenge yourself by increasing the number of points
                    required to survive the week! The value entered in this
                    field will take effect at the beginning of next week.
                  </Text>
                </View>

                <View style={{ width: "96%", alignItems: "center" }}>
                  <Text style={styles.qText}>Font size:</Text>
                  <Picker
                    value={fontSize}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 16,
                      height: 50,
                      width: 120,
                      textAlign: "center",
                      fontSize: consumeCtxt.fontSizes.std,
                      margin: 5,
                    }}
                  >
                    <Picker.Item
                      key={0}
                      value={0}
                      label="Standard"
                      onPress={() => {
                        setFontSize(0);
                      }}
                    />
                    <Picker.Item
                      key={1}
                      value={1}
                      label="Small"
                      onPress={() => {
                        setFontSize(1);
                      }}
                    />
                  </Picker>
                </View>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
