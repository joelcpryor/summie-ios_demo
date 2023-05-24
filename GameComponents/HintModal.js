import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Button,
} from "react-native";
import HintModalContent1 from "../OtherComponents/HintModalContent1";
import HintModalContent2 from "../OtherComponents/HintModalContent2";

import { MetaContext } from "../App";

export default function HintModal(props) {
  ////    ////    inits   ////    ////
  const consumeCtxtMeta = useContext(MetaContext);

  ////    ////    states    ////    ////
  const [modalVisible, setModalVisible] = useState(false);
  const [margin, setMargin] = useState(16);
  const [modalIndex, setModalIndex] = useState(0);

  ////    ////    functions   ////    ////
  const handleOrientationChange = () => {
    /*const fD =
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "row"
        : "column";
    setFlexD(fD);*/
  };

  const toggleIndex = (arg) => {
    setModalIndex(arg);
  };

  ////    ////    useEffects    ////    ////
  useEffect(() => {
    if (
      consumeCtxtMeta.dimensions.width >= 600 &&
      consumeCtxtMeta.dimensions.width < 811
    ) {
      setMargin(40);
    } else if (
      consumeCtxtMeta.dimensions.width >= 811 &&
      consumeCtxtMeta.dimensions.width < 900
    ) {
      setMargin(60);
    } else if (consumeCtxtMeta.dimensions.width >= 900) {
      setMargin(100);
    }
  }, []);

  useEffect(() => {
    if (props.modalVisible == true) {
      setModalVisible(true);
    } else if (props.modalVisible == false) {
      setModalVisible(false);
    }
  }, [props.modalVisible]);

  useEffect(() => {
    handleOrientationChange();
  }, []);

  useEffect(() => {
    const orientationListener = Dimensions.addEventListener(
      "change",
      handleOrientationChange
    );
    return () => {
      orientationListener.remove();
    };
  }, []);

  ////    ////    styles    ////    ////
  const styles = StyleSheet.create({
    modal: {
      margin: margin,
      borderWidth: 4,
      borderRadius: 8,
    },
    modalContent: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 8,
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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            {modalIndex === 0 ? (
              <HintModalContent1 toggleIndex={toggleIndex} />
            ) : (
              <HintModalContent2 toggleIndex={toggleIndex} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
