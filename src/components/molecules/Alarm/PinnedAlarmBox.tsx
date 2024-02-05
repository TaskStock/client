import React from "react";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import { palette } from "../../../constants/colors";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const Container = styled.TouchableOpacity`
  margin: ${spacing.padding}px ${spacing.offset}px;
  padding: ${spacing.offset}px ${spacing.offset}px;
  background-color: ${({ theme }) => theme.box};
  border-radius: ${spacing.padding}px;
`;

const Title = ({ title }) => (
  <FlexBox
    gap={spacing.padding}
    alignItems="center"
    styles={{ paddingBottom: spacing.padding }}
  >
    <IconsWithoutFeedBack
      type="material"
      name="pin"
      size={24}
      color={palette.red}
    />
    <Text size="md">{title}</Text>
  </FlexBox>
);

const PinnedAlarmBox = () => {
  const theme = useTheme();
  const navigation = useNavigation() as any;

  const detailParams = {
    title: "📌  가치 반영 마감 시간 안내",
    subText: "TaskStock팀 드림",
  };

  return (
    <Container onPress={() => navigation.navigate("AlarmDetail", detailParams)}>
      <Title title="가치 반영 마감 시간 안내" />
      <Text size="sm" color={theme.textDim}>
        TaskStock팀 드림
      </Text>
    </Container>
  );
};

export default PinnedAlarmBox;
