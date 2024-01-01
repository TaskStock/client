import React from "react";
import styled from "styled-components/native";
import Text from "./Text";

const BlackBtnContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: black;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 15px 0;
`;

export const BlackBtn = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: any;
}) => {
  return (
    <BlackBtnContainer style={style}>
      <Text size="sm" color={"white"}>
        {text}
      </Text>
    </BlackBtnContainer>
  );
};
