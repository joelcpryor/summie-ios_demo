//  PROPS: headerReady.

import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign } from "@expo/vector-icons";

import { MetaContext } from "../App";

export default function MenuHeader(props) {
  ////    ////    inits       ////    ////
  const navigation = useNavigation();
  const consumeCtxt = useContext(MetaContext);

  ////    ////    states      ////    ////
  const [iconSize, setIconSize] = useState(24);

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    if (consumeCtxt.dimensions.width >= 800) {
      setIconSize(36);
    } else {
      setIconSize(24);
    }
  }, []);

  ////      ////    styles      ////    ////
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.85)",
      paddingVertical: 4,
      paddingHorizontal: 16,
    },
    text: {
      fontSize: consumeCtxt.fontSizes.std,
      color: "white",
      opacity: 0.5,
    },
  });

  ////      ////    component       ////    ////
  return (
    <View style={styles.header}>
      {props.headerReady === true ? (
        <>
          <TouchableOpacity
            onPress={() => {
              props.toggleSettingsModal("show");
            }}
            style={{ width: "25%", alignItems: "flex-start" }}
          >
            <AntDesign name="setting" size={iconSize} color="grey" />
          </TouchableOpacity>

          {props.orient === "landscape" ? (
            <>
              {consumeCtxt.points < consumeCtxt.pointThreshold &&
              props.timeDiffHours > 0 ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: consumeCtxt.fontSizes.std,
                    margin: 5,
                    color: "white",
                  }}
                >
                  You need{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {consumeCtxt.pointThreshold - consumeCtxt.points} points
                  </Text>{" "}
                  in{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {props.timeDiffHours === 1
                      ? `${props.timeDiffHours} hour`
                      : `${props.timeDiffHours} hours`}
                  </Text>{" "}
                  to survive the week!
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: consumeCtxt.fontSizes.std,
                    margin: 5,
                    color: "gold",
                  }}
                >
                  Points earned this week:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {consumeCtxt.points}
                  </Text>
                </Text>
              )}
            </>
          ) : null}

          <TouchableOpacity
            style={{ alignItems: "flex-end", width: "25%" }}
            onPress={() => {
              if (consumeCtxt.netConnection === true) {
                navigation.navigate("My LetterBox");
              } else {
                alert("This feature requires an active internet connection.");
              }
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Entypo name="box" size={iconSize} color="lightgreen" />
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.small,
                  color: "lightgreen",
                }}
              >
                My LetterBox
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ fontSize: consumeCtxt.fontSizes.std, color: "white" }}>
          Updating Word of the Week data ...
        </Text>
      )}
    </View>
  );
}
