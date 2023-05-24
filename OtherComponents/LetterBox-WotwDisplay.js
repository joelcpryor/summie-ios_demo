import React, { useContext } from "react";
import { View, Text } from "react-native";

import SpacedContainer from "./SpacedContainer";

import { MetaContext } from "../App";

export default function WotwDisplay(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);
  const colorRef = [
    consumeCtxt.colourScheme["red"],
    consumeCtxt.colourScheme["orange"],
    consumeCtxt.colourScheme["green"],
    consumeCtxt.colourScheme["yellow"],
    consumeCtxt.colourScheme["blue"],
    consumeCtxt.colourScheme["violet"],
    consumeCtxt.colourScheme["red"],
    consumeCtxt.colourScheme["orange"],
    consumeCtxt.colourScheme["green"],
    consumeCtxt.colourScheme["yellow"],
    consumeCtxt.colourScheme["blue"],
    consumeCtxt.colourScheme["violet"],
    consumeCtxt.colourScheme["red"],
    consumeCtxt.colourScheme["orange"],
    consumeCtxt.colourScheme["green"],
    consumeCtxt.colourScheme["yellow"],
    consumeCtxt.colourScheme["blue"],
    consumeCtxt.colourScheme["violet"],
  ];

  return (
    <SpacedContainer
      height="10%"
      width="96%"
      color="rgba(0,0,0,0.8)"
      aI="center"
      jC="space-evenly"
    >
      <Text style={{ color: "lightgrey", fontSize: consumeCtxt.fontSizes.std }}>
        Word of the Week:
      </Text>
      <View style={{ flexDirection: "row" }}>
        {props.wotwArray.map((el, i) => {
          return (
            <Text
              key={i}
              style={{
                color: colorRef[i],
                fontSize: consumeCtxt.fontSizes.biggest,
                fontWeight: "bold",
                letterSpacing: 5,
              }}
            >
              {el}
            </Text>
          );
        })}
      </View>
    </SpacedContainer>
  );
}
