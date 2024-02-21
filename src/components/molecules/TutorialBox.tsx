import React from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useAppSelect } from "../../store/configureStore.hooks";

const { width: clientWidth } = Dimensions.get("window");

const Container = styled.View<{ ratio: number }>`
  position: absolute;
  width: ${({ ratio }) => clientWidth * ratio}px;
  height: 300px;
  /* background-color: #bc6565; */
  z-index: -1;

  /* bottom: 80%; */
  /* right: -19px; */
`;

const TumyeongBox = styled.Pressable`
  position: absolute;
  width: 100%;
  height: ${useResponsiveFontSize(75)}px;
  bottom: ${useResponsiveFontSize(40)}px;
`;

const TutorialBox = ({
  style,
  type,
  ratio = 0.7,
  onPress,
}: {
  style?: any;
  type: Number;
  ratio?: number;
  onPress?: () => void;
}) => {
  let imageSource;
  const theme = useAppSelect((state) => state.theme.value);

  switch (type) {
    case 1:
      theme === "dark"
        ? (imageSource = require("../../../assets/images/tutorials/tutorial-1-dark.png"))
        : (imageSource = require("../../../assets/images/tutorials/tutorial-1.png"));
      break;
    case 2:
      theme === "dark"
        ? (imageSource = require("../../../assets/images/tutorials/tutorial-2-dark.png"))
        : (imageSource = require("../../../assets/images/tutorials/tutorial-2.png"));
      break;
    case 3:
      theme === "dark"
        ? (imageSource = require("../../../assets/images/tutorials/tutorial-3-dark.png"))
        : (imageSource = require("../../../assets/images/tutorials/tutorial-3.png"));
      break;
    case 4:
      theme === "dark"
        ? (imageSource = require("../../../assets/images/tutorials/tutorial-4-dark.png"))
        : (imageSource = require("../../../assets/images/tutorials/tutorial-4.png"));

      break;
    case 5:
      imageSource = require("../../../assets/images/tutorials/tutorial-5.png");
      break;
    // project
    case 6:
      imageSource = require("../../../assets/images/tutorials/project-1.png");
      break;
    case 7:
      imageSource = require("../../../assets/images/tutorials/project-2.png");
      break;
    // market
    case 8:
      imageSource = require("../../../assets/images/tutorials/market-1.png");
      break;
    case 9:
      imageSource = require("../../../assets/images/tutorials/market-2.png");
      break;
    case 10:
      imageSource = require("../../../assets/images/tutorials/market-3.png");
      break;
    case 11:
      imageSource = require("../../../assets/images/tutorials/market-4.png");
      break;
  }
  if (type === 2) {
    return (
      <Container style={style} ratio={ratio}>
        <Image
          source={imageSource}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
        <Pressable
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <TumyeongBox onPress={onPress} />
      </Container>
    );
  }

  return (
    <Container style={style} ratio={ratio}>
      <Image
        source={imageSource}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      />
    </Container>
  );
};

export default TutorialBox;
