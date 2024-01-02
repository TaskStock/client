import React from "react";
import { Dimensions, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import MyInfo from "../../molecules/Home/MyInfo";
import HomeChart from "../HomeChart";

const clientHeight = Dimensions.get("window").height;

// 그라데이션 배경
// const GradientBackground = styled(LinearGradient).attrs({
//   colors: ["rgba(255, 255, 255, 0.00)", "rgba(255, 255, 255, 0.47)", "#FFFFFF"],
//   start: { x: 0, y: 0 },
//   end: { x: 0, y: 1 },
//   locations: [0, 0.6243, 1],
// })`
//   width: 100%;
//   height: 300px;
//   border-radius: ${spacing.offset}px;
//   margin-top: ${spacing.padding}px;
// `;

const Container = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
  background-color: ${(props) => props.theme.box};
`;

const GraphContainer = ({ myData }) => {
  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: spacing.offset,
        // height: clientHeight * 0.45,
        flex: 1,
      }}
    >
      <MyInfo
        data={{
          cumulative_value: 1000000,
          value_month_ago: 1000000,
          nickname: "김민수",
        }}
      />
      <Container>
        <HomeChart />
      </Container>
    </View>
  );
};

export default GraphContainer;
