import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { MetaContext } from "../App";

export default function BonusDisplayMain() {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);

  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    subHeaderTxt: {
      fontSize: consumeCtxt.fontSizes.small,
      fontWeight: 300,
      textAlign: "center",
    },
    displayLetterTxt: {
      fontSize: consumeCtxt.fontSizes.header,
      fontWeight: "bold",
    },
    displayPanel: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)",
      padding: 4,
      margin: 4,
    },
  });

  return (
    <>
      <Text style={[styles.subHeaderTxt, { fontWeight: "bold" }]}>
        How to earn bonus points:
      </Text>
      <View>
        <View style={styles.displayPanel}>
          <View style={{ borderWidth: 1, borderColor: "grey", padding: 2 }}>
            <Text style={[styles.displayLetterTxt, { color: "red" }]}>A</Text>
          </View>

          <View style={{ padding: 2 }}>
            <Text style={[styles.displayLetterTxt, { color: "orange" }]}>
              B
            </Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: "grey", padding: 2 }}>
            <Text style={[styles.displayLetterTxt, { color: "yellow" }]}>
              A
            </Text>
          </View>
        </View>
        <Text style={styles.subHeaderTxt}>
          Earn matching letters. The more you match, the more you gain!
        </Text>
      </View>
      <View>
        <View style={styles.displayPanel}>
          <Text style={[styles.displayLetterTxt, { color: "red" }]}>A</Text>
          <AntDesign name="arrowright" size={24} color="grey" />
          <Text style={[styles.displayLetterTxt, { color: "orange" }]}>B</Text>
          <AntDesign name="arrowright" size={24} color="grey" />
          <Text style={[styles.displayLetterTxt, { color: "yellow" }]}>C</Text>
        </View>
        <Text style={styles.subHeaderTxt}>
          Earn an ascending sequence of letters. Longer sequences yield greater
          rewards!
        </Text>
      </View>
    </>
  );
}
