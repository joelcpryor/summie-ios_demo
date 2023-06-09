import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { MetaContext } from "../App";
import Slider from "react-native-ui-lib/slider";
import { diffObject } from "../Functions/Objects";
import { Ionicons } from "@expo/vector-icons";

export default function DiffSelection(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);

  ////    ////    states      ////    ////
  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    diffText: {
      fontSize: consumeCtxt.fontSizes.biggest,
      fontWeight: "bold",
      color: props.trackColor,
    },
    otherText: {
      fontSize: consumeCtxt.fontSizes.subHeader,
      fontWeight: 300,
      color: "white",
    },
    playBtn: {
      padding: 10,
      backgroundColor: "gold",
      borderRadius: 8,
      borderWidth: 2,
      margin: 2,
    },
    mainContainer: {
      height: "50%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: "skyblue",
    },
  });

  return (
    <>
      <Pressable
        style={{
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() => {
          props.revertMenu();
        }}
      >
        <Ionicons name="arrow-back" size={24} color="lightgrey" />
        <Text
          style={{
            fontSize: consumeCtxt.fontSizes.small,
            fontStyle: "italic",
            color: "grey",
            marginLeft: 5,
          }}
        >
          BACK
        </Text>
      </Pressable>
      <Text
        style={{
          fontSize: consumeCtxt.fontSizes.std,
          fontStyle: "italic",
          color: "white",
          opacity: 0.5,
        }}
      >
        SELECT DIFFICULTY:
      </Text>
      <Text style={styles.diffText}>{props.diffDisplay}</Text>
      <View
        style={{
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text style={styles.otherText}>
          Reward:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {props.snack === true
              ? `${diffObject[props.selectedDiff].reward_snack}`
              : `${diffObject[props.selectedDiff].reward_classic}`}
          </Text>
        </Text>
        <Text style={styles.otherText}>
          Grid size:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {props.snack === true
              ? ` 3x3 `
              : ` ${diffObject[props.selectedDiff].grid_size} `}
          </Text>
        </Text>
        {props.snack === true ? null : (
          <Text style={styles.otherText}>
            Mistakes:{" "}
            <Text style={{ fontWeight: "bold" }}>{` ${
              diffObject[props.selectedDiff].errors
            } `}</Text>
          </Text>
        )}
      </View>
      <View style={{ width: "90%" }}>
        <Slider
          value={0}
          minimumValue={0}
          maximumValue={props.snack === true ? 3 : 5}
          step={1}
          thumbTintColor="black"
          minimumTrackTintColor={props.trackColor}
          onValueChange={(value) => {
            props.changeSelectedDiff(value);
          }}
        />
      </View>
      <TouchableOpacity style={styles.playBtn} onPress={props.initGame}>
        <Text
          style={{
            fontSize: consumeCtxt.fontSizes.header,
            fontWeight: "bold",
          }}
        >
          {props.snack === true
            ? `Play Summie Snacks!`
            : `Play Summie Classic!`}
        </Text>
      </TouchableOpacity>
    </>
  );
}
