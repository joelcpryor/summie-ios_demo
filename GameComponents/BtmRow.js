import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import BtmCell from "./BtmCell";

export default function BtmRow(props) {
  ////    ////    styles      ////    ////
  const styles = StyleSheet.create({
    parentContainer: {
      height:
        props.landscape === true
          ? "18%"
          : props.landscape === false
          ? "22%"
          : "40%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });

  ////    ////    useEffects      ////    ////
  useEffect(() => {
    console.log(props.landscape);
  }, []);
  ////    ////    component   ////    ////

  return (
    <View style={styles.parentContainer}>
      {props.ids[0] !== undefined ? <BtmCell id={props.ids[0]} /> : null}
      {props.ids[1] !== undefined ? <BtmCell id={props.ids[1]} /> : null}
      {props.ids[2] !== undefined ? <BtmCell id={props.ids[2]} /> : null}
      {props.ids[3] !== undefined ? <BtmCell id={props.ids[3]} /> : null}
      {props.ids[4] !== undefined ? <BtmCell id={props.ids[4]} /> : null}
      {props.ids[5] !== undefined ? <BtmCell id={props.ids[5]} /> : null}
    </View>
  );
}
