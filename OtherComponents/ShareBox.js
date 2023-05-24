import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Sharing from "expo-sharing";

import { MetaContext } from "../App";

export default function ShareBox(props) {
  const consumeCtxt = useContext(MetaContext);
  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    imageView: {
      width: "100%",
      height: consumeCtxt.dimensions.height <= 896 ? 160 : 240,
      maxWidth: 600,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderRadius: 4,
    },
    shareView: {
      width: "50%",
      padding: 6,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  });

  ////      ////    component       ////        ////
  return (
    <View style={styles.imageView}>
      <Image
        source={{ uri: props.picRoute }}
        style={{
          width: consumeCtxt.dimensions.height <= 896 ? 150 : 150,
          height: consumeCtxt.dimensions.height <= 896 ? 150 : 220,
        }}
        resizeMode="contain"
      ></Image>
      <View style={styles.shareView}>
        <Text
          style={{
            fontSize: consumeCtxt.fontSizes.std,
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "bold",
            color: "lightgrey",
          }}
        >
          Share your solution with the world!
        </Text>
        <Text />
        <TouchableOpacity
          onPress={async () => {
            /*const result = await Sharing.isAvailableAsync();
            if (result == true) {
              try {
                await Sharing.shareAsync(props.picRoute);
              } catch (err) {
                alert("Sharing failed.");
              }
            } else {
              alert("Sharing is currently unavailable.");
            }*/
            alert("This feature is coming soon!");
          }}
        >
          <View
            style={{
              backgroundColor: "skyblue",
              padding: 8,
              borderWidth: 1,
              borderRadius: 4,
            }}
          >
            <Text style={{ fontSize: consumeCtxt.fontSizes.std }}>Share!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
