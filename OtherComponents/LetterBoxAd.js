import React, { useContext } from "react";
import { View, Text, Button } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { MetaContext } from "../App";

export default function LetterBoxAd(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);
  const navigation = useNavigation();

  return (
    <View
      style={{
        minHeight: "20%",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(0,0,0,0.7)",
        maxWidth: 500,
        padding: 10,
        borderRadius: 8,
      }}
    >
      <Entypo name="box" size={24} color="lightgreen" />
      <Text
        style={{
          fontSize: consumeCtxt.fontSizes.std,
          color: "lightgrey",
          margin: 5,
        }}
      >
        {consumeCtxt.letters.length === 1
          ? `You have 1 letter in your LetterBox.`
          : `You have ${consumeCtxt.letters.length} letters in your LetterBox!`}
      </Text>
      <Text
        style={{
          fontSize: consumeCtxt.fontSizes.small,
          color: "white",
          textAlign: "center",
        }}
      >
        Solve <Text style={{ fontWeight: "bold" }}>Summie Classic</Text> puzzles
        to earn letters, submit words, and earn even more points!
      </Text>
    </View>
  );
}
