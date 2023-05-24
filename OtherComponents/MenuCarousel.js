import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Carousel, Image } from "react-native-ui-lib";
import { MetaContext } from "../App";

export default function MenuCarousel(props) {
  ////    ////    inits       ////    ////
  const images = [
    require("../assets/classic_carousel.png"),
    require("../assets/snacks_carousel.png"),
  ];
  const consumeCtxt = useContext(MetaContext);

  ////      ////    states      ////    ////

  ////      ////    functions       ////    ////

  ////      ////    component       ////    ////
  return (
    <Carousel
      onChangePage={(index) => {
        props.changeSelectedMode(index);
      }}
      containerStyle={{
        height: props.imgHeight,
        width: props.imgWidth,
      }}
    >
      {images.map((image, index) => (
        <Image
          key={index}
          source={image}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      ))}
    </Carousel>
  );
}
