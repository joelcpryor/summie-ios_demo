import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MetaContext } from "../App";

export default function BonusDisplayFixed() {
  const consumeCtxt = useContext(MetaContext);

  return (
    <>
      <Text style={{ fontSize: consumeCtxt.fontSizes.std, fontWeight: "bold" }}>
        Remember ...
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        The yellow rows and columns will always sum to 9, and each of them
        contains a unique combination of numbers.
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        Pay attention to this rule, because it will help you to reason through
        the puzzle.
      </Text>
    </>
  );
}
