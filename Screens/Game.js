import React from "react";
//import { SafeAreaView } from "react-native";
import SummieBoard from "../GameComponents/SummieBoard";
import SnackBoard from "../GameComponents/SnackBoard";

export default function Game({ route }) {
  return (
    <>
      {route.params.snack === true ? (
        <SummieBoard mode="snack" diff={route.params.diff} />
      ) : (
        <SummieBoard mode="game" diff={route.params.diff} />
      )}
    </>
  );
}
