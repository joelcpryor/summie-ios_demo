import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MetaContext } from "../App";

export default function BonusDisplaySettings() {
  const consumeCtxt = useContext(MetaContext);

  return (
    <>
      <Text style={{ fontSize: consumeCtxt.fontSizes.std, fontWeight: "bold" }}>
        Did you know ...
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        If you want to challenge yourself, you can manually raise the number of
        points required to "survive the week".
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        This setting, and others, can be changed by tapping the settings icon in
        the top-left corner of the menu screen.
      </Text>
    </>
  );
}
