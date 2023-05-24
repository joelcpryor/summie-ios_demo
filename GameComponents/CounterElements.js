import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import WheelPicker from "react-native-wheely";

import { GameContext } from "./SummieBoard";
import { MetaContext } from "../App";

export default function CounterElements(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(GameContext);
  const metaCtxt = useContext(MetaContext);
  const gridStates = ["default", "solve-left", "solve-right"];

  ////    ////    states      ////    ////
  const [pickerIndex, setPickerIndex] = useState(0);

  ////    ////    functions   ////    ////

  ////    ////    useEffects  ////    ////

  ////    ////    styles      ////    ////

  const styles = StyleSheet.create({
    parentContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: "rgba(0,0,0,0.2)",
      paddingHorizontal: 10,
    },
    button: {
      padding: 8,
      borderWidth: 1,
      borderRadius: 4,
      alignItems: "center",
      margin: 5,
    },
  });

  ////    ////    component   ////    ////

  return (
    <View style={styles.parentContainer}>
      {consumeCtxt.solved === false ? (
        <>
          {consumeCtxt.smartGrid !== null ? (
            <WheelPicker
              selectedIndex={pickerIndex}
              options={[" Default ", " Solve Left ", " Solve Right "]}
              selectedIndicatorStyle={{
                backgroundColor: "lightblue",
                borderWidth: 2,
                borderColor: "indigo",
                opacity: 1,
              }}
              visibleRest={0}
              onChange={(index) => {
                setPickerIndex(index);
                consumeCtxt.modifySG(gridStates[index]);
              }}
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "50%",
                maxWidth: 250,
              }}
            >
              <Pressable
                onPress={() => {
                  consumeCtxt.toggleHintModal();
                }}
              >
                <Animated.View
                  style={{
                    padding: 8,
                    borderRadius: 16,
                  }}
                >
                  <AntDesign name="questioncircle" size={24} color="indigo" />
                </Animated.View>
              </Pressable>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Enable SmartGrid?",
                    "If you enable this feature, the amount of points that you earn from solving the puzzle will be halved.",
                    [
                      {
                        text: "Enable",
                        onPress: () => {
                          consumeCtxt.modifySG("default");
                        },
                      },
                      {
                        text: "Cancel",
                        onPress: () => {
                          console.log("Alert dismissed");
                        },
                      },
                    ]
                  );
                }}
                style={[styles.button, { backgroundColor: "violet" }]}
              >
                <Text style={{ fontSize: metaCtxt.fontSizes.small }}>
                  Enable SmartGrid
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              consumeCtxt.resetBoard();
            }}
            style={[styles.button, { backgroundColor: "lightblue" }]}
          >
            <Text style={{ fontSize: metaCtxt.fontSizes.small }}>Reset</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}
