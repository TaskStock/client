import { View, ScrollView } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import { spacing } from "../../../constants/spacing";
import Text from "../../atoms/Text";
import Margin from "../../atoms/Margin";
import RoundItemBtn from "../../atoms/RoundItemBtn";

const Box = styled.View`
  background-color: ${({ theme }) => theme.box};
  padding: ${useResponsiveFontSize(20)}px;
  border-radius: 20px;
  /* 안드로이드용 */
  elevation: 2;

  /* IOS용으로 추가 */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  /* shadow-opacity: 0.1; */
  shadow-radius: 10px;
`;

function RetrospectItem() {
  return (
    <Box>
      <FlexBox gap={spacing.small}>
        <Text size="xs" color="red">
          Taskstock
        </Text>
        <Text size="xs">2023.01.14</Text>
      </FlexBox>
      <Margin margin={spacing.small}></Margin>
      <Text size="md">
        회고 내용 미리보기 별도의 제목없이 일기 형식으로 줄글. 최대 3줄까지 회고
        섹션 메인에서 보여주기.
      </Text>
    </Box>
  );
}

export default function RetrospectList() {
  const theme = useTheme();
  return (
    <ScrollView style={{}}>
      <FlexBox gap={spacing.offset} direction="column">
        {[1, 2, 3, 4, 5].map((item) => {
          return <RetrospectItem></RetrospectItem>;
        })}
      </FlexBox>
    </ScrollView>
  );
}
