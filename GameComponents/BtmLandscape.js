import React, { useContext } from "react";
import { View } from "react-native";
import BtmRow from "./BtmRow";
import { MetaContext } from "../App";

export default function BtmLandscape(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);

  return (
    <View
      style={{
        height: "50%",
        maxWidth: consumeCtxt.dimensions.height * 0.6,
        justifyContent: "space-evenly",
        paddingBottom: 10,
      }}
    >
      {props.diff === "easy" ? (
        <>
          <BtmRow landscape={true} ids={["b0", "b1", "b2", "b3"]} />
          <BtmRow landscape={true} ids={["b4", "b5", "b6", "b7"]} />
          <BtmRow landscape={true} ids={["b8", "b9", "b10", "b11"]} />
        </>
      ) : props.diff === "not_so_easy" ? (
        <>
          <BtmRow landscape={true} ids={["b0", "b1", "b2", "b3"]} />
          <BtmRow landscape={true} ids={["b4", "b5", "b6", "b7"]} />
          <BtmRow landscape={true} ids={["b8", "b9", "b10", "b11"]} />
        </>
      ) : props.diff === "slightly_stressful" ? (
        <>
          <BtmRow landscape={true} ids={["b0", "b1", "b2", "b3", "b4"]} />
          <BtmRow landscape={true} ids={["b5", "b6", "b7", "b8", "b9"]} />
          <BtmRow landscape={true} ids={["b10", "b11", "b12", "b13", "b14"]} />
          <BtmRow landscape={true} ids={["b15", "b16", "b17"]} />
        </>
      ) : props.diff === "kinda_hard" ? (
        <>
          <BtmRow landscape={true} ids={["b0", "b1", "b2", "b3", "b4"]} />
          <BtmRow landscape={true} ids={["b5", "b6", "b7", "b8", "b9"]} />
          <BtmRow landscape={true} ids={["b10", "b11", "b12", "b13", "b14"]} />
          <BtmRow landscape={true} ids={["b15", "b16", "b17"]} />
        </>
      ) : props.diff === "pretty_damn_tricky" ? (
        <>
          <BtmRow landscape={true} ids={["b0", "b1", "b2", "b3", "b4"]} />
          <BtmRow landscape={true} ids={["b5", "b6", "b7", "b8", "b9"]} />
          <BtmRow landscape={true} ids={["b10", "b11", "b12", "b13", "b14"]} />
          <BtmRow landscape={true} ids={["b15", "b16", "b17"]} />
        </>
      ) : props.diff === "break_my_brain" ? (
        <>
          <BtmRow landscape={true} ids={["b0", "b1", "b2", "b3", "b4"]} />
          <BtmRow landscape={true} ids={["b5", "b6", "b7", "b8", "b9"]} />
          <BtmRow landscape={true} ids={["b10", "b11", "b12", "b13"]} />
          <BtmRow landscape={true} ids={["b14", "b15", "b16", "b17"]} />
          <BtmRow landscape={true} ids={["b18", "b19", "b20", "b21"]} />
        </>
      ) : null}
    </View>
  );
}
