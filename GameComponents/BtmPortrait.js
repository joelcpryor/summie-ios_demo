import React, { useContext } from "react";
import { View, Text } from "react-native";
import BtmRow from "./BtmRow";
import { MetaContext } from "../App";

export default function BtmPortrait(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);

  return (
    <View
      style={{
        height: "100%",
        maxWidth: consumeCtxt.dimensions.height * 0.6,
        justifyContent: "space-evenly",
        paddingBottom: 10,
      }}
    >
      {props.diff === "easy" ? (
        <>
          <BtmRow landscape={false} ids={["b0", "b1", "b2", "b3"]} />
          <BtmRow landscape={false} ids={["b4", "b5", "b6", "b7"]} />
          <BtmRow landscape={false} ids={["b8", "b9", "b10", "b11"]} />
        </>
      ) : props.diff === "not_so_easy" ? (
        <>
          <BtmRow landscape={false} ids={["b0", "b1", "b2", "b3"]} />
          <BtmRow landscape={false} ids={["b4", "b5", "b6", "b7"]} />
          <BtmRow landscape={false} ids={["b8", "b9", "b10", "b11"]} />
        </>
      ) : props.diff === "slightly_stressful" ? (
        <>
          <BtmRow
            landscape={false}
            ids={["b0", "b1", "b2", "b3", "b4", "b5"]}
          />
          <BtmRow
            landscape={false}
            ids={["b6", "b7", "b8", "b9", "b10", "b11"]}
          />
          <BtmRow
            landscape={false}
            ids={["b12", "b13", "b14", "b15", "b16", "b17"]}
          />
        </>
      ) : props.diff === "kinda_hard" ? (
        <>
          <BtmRow
            landscape={false}
            ids={["b0", "b1", "b2", "b3", "b4", "b5"]}
          />
          <BtmRow
            landscape={false}
            ids={["b6", "b7", "b8", "b9", "b10", "b11"]}
          />
          <BtmRow
            landscape={false}
            ids={["b12", "b13", "b14", "b15", "b16", "b17"]}
          />
        </>
      ) : props.diff === "pretty_damn_tricky" ? (
        <>
          <BtmRow
            landscape={false}
            ids={["b0", "b1", "b2", "b3", "b4", "b5"]}
          />
          <BtmRow
            landscape={false}
            ids={["b6", "b7", "b8", "b9", "b10", "b11"]}
          />
          <BtmRow
            landscape={false}
            ids={["b12", "b13", "b14", "b15", "b16", "b17"]}
          />
        </>
      ) : props.diff === "break_my_brain" ? (
        <>
          <BtmRow
            landscape={false}
            ids={["b0", "b1", "b2", "b3", "b4", "b5"]}
          />
          <BtmRow landscape={false} ids={["b6", "b7", "b8", "b9", "b10"]} />
          <BtmRow
            landscape={false}
            ids={["b11", "b12", "b13", "b14", "b15", "b16"]}
          />
          <BtmRow landscape={false} ids={["b17", "b18", "b19", "b20", "b21"]} />
        </>
      ) : null}
    </View>
  );
}
