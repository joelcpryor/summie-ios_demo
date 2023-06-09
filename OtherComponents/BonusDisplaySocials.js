import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MetaContext } from "../App";

export default function BonusDisplaySocials() {
  const consumeCtxt = useContext(MetaContext);

  return (
    <>
      <Text style={{ fontSize: consumeCtxt.fontSizes.std, fontWeight: "bold" }}>
        Did you know ...
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        Summie is the first app ever developed by Vibe Shift, a software
        start-up based in Adelaide, Australia.
      </Text>
      <Text
        style={{ fontSize: consumeCtxt.fontSizes.small, textAlign: "center" }}
      >
        To join the journey, follow our socials:{" "}
        <Text style={{ fontWeight: "bold" }}>Vibe Shift</Text> on Facebook, and{" "}
        <Text style={{ fontWeight: "bold" }}>@vibe_shift_biz</Text> on Instagram
        and Twitter.
      </Text>
    </>
  );
}
