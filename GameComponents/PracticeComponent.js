import React, { useState, useEffect, useRef, useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";

import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";
import LayoutPractice from "./LayoutPractice";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function GameComponent(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);

  ////      ////    states      ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [orient, setOrient] = useState("portrait");

  ////    ////    functions   ////    ////

  const handleOrientationChange = () => {
    const newOrientation =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "landscape"
        : "portrait";
    setOrient(newOrientation);
  };

  ////      ////    useEffects      ////    ////
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
    parentContainer: {
      height: "100%",
      width: "100%",
    },
  });

  ////      ////    component       ////    ////
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../assets/canva1.png")}>
        <GlobalStatusBar />
        <View style={styles.parentContainer}>
          {consumeCtxt.isLoading == true ? (
            <ActivityIndicator />
          ) : (
            <LayoutPractice orientation={orient} />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
