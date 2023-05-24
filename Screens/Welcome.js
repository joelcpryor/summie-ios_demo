import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Button,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Column from "../OtherComponents/Welcome-Column";
import GlobalStatusBar from "../OtherComponents/GlobalStatusBar";

import { MetaContext } from "../App";

export default function Welcome() {
  ////    ////    inits     ////    ////
  const consumeCtxt = useContext(MetaContext);
  const navigation = useNavigation();

  ////    ////    states      ////    ////
  const [boxDimensions, setBoxDimensions] = useState(null);
  const [isReady, setIsReady] = useState(true);
  const [renderBtn, setRenderBtn] = useState(false);

  ////    ////    functions     ////    ////
  ////    ////    useEffects      ////    ////
  useEffect(() => {
    async function init() {
      //  Get dimensions of device, set global variable.
      const dimensions = await consumeCtxt.initSettings();
      //  Set dimensions of animated boxes.
      if (dimensions[0] < dimensions[1]) {
        setBoxDimensions(dimensions[0] / 7);
      } else {
        setBoxDimensions(dimensions[1] / 7);
      }

      //  set isReady == true so that animation is visible.
      setIsReady(true);
      //  Sync async data with global variable.
      consumeCtxt.initData();
    }

    setTimeout(() => {
      //  When animation has concluded, navigate to menu.
      navigation.navigate("Menu");
    }, 4000);

    setTimeout(() => {
      //  Once navigation is complete, render manual navigation button (so that users can get back to the menu if they accidentally navigate to the Welcome screen).
      setRenderBtn(true);
    }, 6000);

    init();
  }, []);
  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    columnContainer: {
      width:
        Dimensions.get("window").width > Dimensions.get("window").height
          ? "60%"
          : "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  });

  ////    ////    component     ////    ////
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../assets/fall1.jpg")}>
        <GlobalStatusBar />
        <View style={styles.parentContainer}>
          {isReady === true ? (
            <View style={styles.columnContainer}>
              <Column
                letter="S"
                color="red"
                sqDim={boxDimensions}
                colHeight={boxDimensions * 6}
              />
              <Column
                letter="U"
                color="orange"
                sqDim={boxDimensions}
                colHeight={boxDimensions * 4}
              />
              <Column
                letter="M"
                color="yellow"
                sqDim={boxDimensions}
                colHeight={boxDimensions * 2}
              />
              <Column
                letter="M"
                color="green"
                sqDim={boxDimensions}
                colHeight={boxDimensions * 2}
              />
              <Column
                letter="I"
                color="blue"
                sqDim={boxDimensions}
                colHeight={boxDimensions * 4}
              />
              <Column
                letter="E"
                color="violet"
                sqDim={boxDimensions}
                colHeight={boxDimensions * 6}
              />
            </View>
          ) : null}
          {renderBtn === true ? (
            <View>
              <View style={{ height: 10 }} />
              <Button
                title="To Menu"
                onPress={() => {
                  navigation.navigate("Menu");
                }}
              />
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
