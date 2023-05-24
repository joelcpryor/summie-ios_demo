import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MetaContext } from "../App";

//import ShareBox from "../SecondaryComponents/PG-ShareBox";
import LetterCollect from "../OtherComponents/LetterCollect";
import SpacedContainer from "../OtherComponents/SpacedContainer";

export default function PostGameModal(props) {
  ////    ////    inits   ////    ////
  const navigation = useNavigation();
  const consumeCtxt = useContext(MetaContext);

  ////    ////    states    ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [margin, setMargin] = useState(16);

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    if (Dimensions.get("window").width < Dimensions.get("window").height) {
      if (
        consumeCtxt.dimensions.width >= 600 &&
        consumeCtxt.dimensions.width < 800
      ) {
        setMargin(40);
      } else if (
        consumeCtxt.dimensions.width >= 800 &&
        consumeCtxt.dimensions.width < 900
      ) {
        setMargin(60);
      } else if (consumeCtxt.dimensions.width >= 900) {
        setMargin(100);
      }
    } else {
      setMargin(16);
    }
  }, []);

  useEffect(() => {
    if (props.modalVisible == true) {
      setModalVisible(true);
    }
  }, [props.modalVisible]);

  ////    ////    styles    ////    ////
  const styles = StyleSheet.create({
    modal: {
      margin: margin,
      borderWidth: 2,
    },
    modalContent: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 10,
    },
    header: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: "gold",
    },
    mainText: {
      fontSize: consumeCtxt.fontSizes.std,
      textAlign: "center",
    },
  });

  ////    ////    component   ////    ////
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <SafeAreaView>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.header,
                  fontWeight: "bold",
                }}
              >
                Well done!
              </Text>
            </View>

            <LetterCollect
              lettersEarned={props.lettersEarned}
              practice={true}
            />

            <SpacedContainer
              width="96%"
              height="55%"
              color="lightblue"
              aI="center"
              jC="space-evenly"
            >
              <Text
                style={{
                  fontSize: consumeCtxt.fontSizes.header,
                  fontWeight: "bold",
                }}
              >
                What are the letters for?
              </Text>
              <Text style={styles.mainText}>
                Whenever you solve a puzzle, you are rewarded with letters. You
                can then use your letters to submit words using the 'My
                LetterBox' feature.
              </Text>
              <Text style={styles.mainText}>
                Submitting words is how you earn points, and earning points is
                how you{" "}
                <Text style={{ fontWeight: "bold" }}>survive the week!</Text>
              </Text>
              <Text style={styles.mainText}>
                Now that you know how the game works, there's only one question
                remaining:
              </Text>
              <Text
                style={[
                  styles.mainText,
                  { fontWeight: "bold", fontStyle: "italic" },
                ]}
              >
                How many weeks can you survive?
              </Text>
            </SpacedContainer>

            <TouchableOpacity
              style={{
                padding: 8,
                borderWidth: 2,
                borderRadius: 4,
                backgroundColor: "lightgrey",
              }}
              onPress={() => {
                navigation.navigate("Menu");
              }}
            >
              <Text style={styles.mainText}>Return to menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
