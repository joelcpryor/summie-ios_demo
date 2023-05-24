import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MetaContext } from "../App";

export default function BonusDisplayFixed() {
  const consumeCtxt = useContext(MetaContext);

  return (
    <>
      <Text style={{ fontSize: consumeCtxt.fontSizes.std, fontWeight: "bold" }}>
        Did you know ...
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        Pressing and holding a white tile will fix it in place. Fixed tiles
        remain in place when you reset the grid, allowing you to 'set and
        forget' tiles that you know are correct.
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        Later, if you want to unfix the tile, you can simply press and hold
        again!
      </Text>
    </>
  );
}
