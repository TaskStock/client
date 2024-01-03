import React from "react";
import { Dimensions, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import HomeUserInfo from "../../molecules/Home/HomeUserInfo";
import HomeChart from "../HomeChart";
import CandleStickIcon from "../../../../assets/icons/CandleStickIcon.svg";
import LineChartIcon from "../../../../assets/icons/lineChartIcon.svg";
import { WithLocalSvg } from "react-native-svg";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";

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

const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  border: ${useResponsiveFontSize(1.5)}px solid
    ${({ theme }) => theme.textDimmer};
  border-radius: ${useResponsiveFontSize(12)}px;
`;

const IconBox = styled.Pressable`
  padding: ${useResponsiveFontSize(9)}px ${useResponsiveFontSize(11)}px;
`;

const Divider = styled.View`
  width: ${useResponsiveFontSize(1.5)}px;
  background-color: ${({ theme }) => theme.textDimmer};
`;

const GraphContainer = ({ myData }) => {
  const [isCandleStick, setIsCandleStick] = React.useState(false);

  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: spacing.offset,
        flex: 1,
      }}
    >
      <FlexBox alignItems="flex-end" justifyContent="space-between">
        <HomeUserInfo
          data={{
            cumulative_value: 1000000,
            value_month_ago: 1000000,
            nickname: "김민수",
          }}
        />
        <IconContainer>
          <IconBox
            onPress={() => {
              setIsCandleStick(true);
            }}
          >
            <WithLocalSvg
              width={18}
              height={18}
              asset={CandleStickIcon}
              style={{
                opacity: isCandleStick ? 1 : 0.5,
              }}
            />
          </IconBox>
          <Divider />
          <IconBox
            onPress={() => {
              setIsCandleStick(false);
            }}
          >
            <WithLocalSvg
              width={18}
              height={18}
              asset={LineChartIcon}
              style={{
                opacity: isCandleStick ? 0.5 : 1,
              }}
            />
          </IconBox>
        </IconContainer>
      </FlexBox>
      <Container>
        <HomeChart isCandleStick={isCandleStick} />
      </Container>
    </View>
  );
};

export default GraphContainer;
