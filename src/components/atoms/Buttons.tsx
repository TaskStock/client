import React from "react";
import styled from "styled-components/native";
import Text from "./Text";
import LoadingSpinner from "./LoadingSpinner";
import { darkTheme, grayTheme } from "../../constants/colors";

const BlackBtnContainer = styled.TouchableOpacity<{ loading: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.loading ? props.theme.textDimmer : props.theme.text};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 15px 0;
`;
const WhiteBtnContainer = styled(BlackBtnContainer)`
  background-color: white;
  border: 1px solid ${grayTheme.text};
`;
export const BlackBtn = ({
  text,
  onPress,
  style,
  loading = false,
}: {
  text: string;
  onPress: () => void;
  style?: any;
  loading?: boolean;
}) => {
  return (
    <BlackBtnContainer style={style} onPress={onPress} loading={loading}>
      {loading ? (
        <LoadingSpinner background={grayTheme.text} />
      ) : (
        <Text size="sm" color={"white"}>
          {text}
        </Text>
      )}
    </BlackBtnContainer>
  );
};

export const WhiteBtn = ({
  text,
  onPress,
  style,
  loading = false,
}: {
  text: string;
  onPress: () => void;
  style?: any;
  loading?: boolean;
}) => {
  return (
    <WhiteBtnContainer style={style} onPress={onPress} loading={loading}>
      {loading ? (
        <LoadingSpinner background={darkTheme.text} />
      ) : (
        <Text size="sm" color={"black"}>
          {text}
        </Text>
      )}
    </WhiteBtnContainer>
  );
};
