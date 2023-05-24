import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";

import Letter from "./LetterBox-Letter";

export default function LetterRow(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
      }}
    >
      <Letter letter={props.letters[0]} uid={props.uids[0]} />
      <Letter letter={props.letters[1]} uid={props.uids[1]} />
      <Letter letter={props.letters[2]} uid={props.uids[2]} />
      <Letter letter={props.letters[3]} uid={props.uids[3]} />
      <Letter letter={props.letters[4]} uid={props.uids[4]} />
      <Letter letter={props.letters[5]} uid={props.uids[5]} />
      <Letter letter={props.letters[6]} uid={props.uids[6]} />
    </View>
  );
}
