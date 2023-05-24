import React from "react";
//import { SafeAreaView } from "react-native";
import SummieBoard from "../GameComponents/SummieBoard";

export default function Game({ route }) {
  return <SummieBoard mode="practice" diff={route.params.diff} />;
}
