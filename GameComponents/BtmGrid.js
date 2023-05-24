import React, { useContext } from "react";
//import { StyleSheet } from "react-native";
import BtmPortrait from "./BtmPortrait";
import BtmLandscape from "./BtmLandscape";
//import { MetaContext } from "../App";

export default function BtmGrid(props) {
  ////    ////    inits   ////    ////
  //const consumeCtxt = useContext(MetaContext);

  ////    ////    styles    ////    ////
  return (
    <>
      {props.orientation === "portrait" ? (
        <BtmPortrait diff={props.diff} />
      ) : (
        <BtmLandscape diff={props.diff} />
      )}
    </>
  );
}
