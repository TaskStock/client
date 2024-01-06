import React from "react";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";

const Line = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.text};
  flex: 1;
`;

const Divider = () => {
  return (
    <FlexBox
      alignItems="center"
      gap={spacing.padding}
      styles={{ paddingBottom: spacing.offset }}
    >
      <Line />
      <Text size="sm">로그인/회원가입</Text>
      <Line />
    </FlexBox>
  );
};

export default Divider;
