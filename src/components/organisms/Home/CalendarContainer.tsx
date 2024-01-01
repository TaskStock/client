import { View, Dimensions } from "react-native";
import React from "react";
import HomeCalendar from "../HomeCalendar";
import { spacing } from "../../../constants/spacing";
import styled from "styled-components/native";
import Text from "../../atoms/Text";

const clientHeight = Dimensions.get("window").height;

const Container = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
  background-color: ${(props) => props.theme.box};
`;

const DateInfo = () => {
  return (
    <Text size="xl" weight="bold">
      2023년 11월
    </Text>
  );
};
const CalendarContainer = () => {
  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: spacing.offset,
        height: clientHeight * 0.45,
      }}
    >
      <DateInfo />
      <Container>
        <HomeCalendar />
      </Container>
    </View>
  );
};

export default CalendarContainer;
