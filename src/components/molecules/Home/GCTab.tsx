import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const Container = styled.View`
  padding: 0 ${spacing.gutter}px;
  flex-direction: row;
  gap: ${spacing.gutter}px;
`;

const Tab = styled.TouchableOpacity<{ graphSelected: boolean }>`
  border-bottom-width: ${useResponsiveFontSize(3)}px;
  border-bottom-color: ${(props) =>
    props.graphSelected ? props.theme.text : "transparent"};
  padding-bottom: ${useResponsiveFontSize(10)}px;
`;
const TabText = styled.Text<{ isFocused: boolean }>`
  font-size: ${useResponsiveFontSize(20)}px;
  font-family: ${(props) => (props.isFocused ? "bold" : "regular")};
  color: ${(props) =>
    props.isFocused ? props.theme.text : props.theme.textDim};
`;

const GCTab = ({ graphSelected, setGraphSelected }) => {
  return (
    <Container>
      <Tab onPress={() => setGraphSelected(true)} graphSelected={graphSelected}>
        <TabText isFocused={graphSelected}>그래프</TabText>
      </Tab>

      <Tab
        onPress={() => setGraphSelected(false)}
        graphSelected={!graphSelected}
      >
        <TabText isFocused={!graphSelected}>캘린더</TabText>
      </Tab>
    </Container>
  );
};

export default GCTab;
