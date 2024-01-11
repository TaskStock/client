import React from "react";
import { Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import HomeUserInfo from "../../molecules/Home/HomeUserInfo";
import HomeChart from "../HomeChart";
import CandleStickIcon from "../../../../assets/icons/CandleStickIcon.svg";
import LineChartIcon from "../../../../assets/icons/lineChartIcon.svg";
import { WithLocalSvg } from "react-native-svg";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import { LinearGradient } from "expo-linear-gradient";
import useUser from "../../../hooks/useUser";
import { useAppSelect } from "../../../store/configureStore.hooks";
import WagmeChart from "../WagmeChart";

const Container = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: ${(props) => props.theme.box}; */
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

const ContainerSize = React.createContext({
  width: 0,
  height: 0,
});

export const sizeContext = React.createContext({
  width: 0,
  height: 0,
});

const GraphContainer = ({ myData }) => {
  const [isCandleStick, setIsCandleStick] = React.useState(true);

  const theme = useAppSelect((state) => state.theme);
  const gradient =
    theme.value === "dark"
      ? [
          "rgba(255, 255, 255, 0.00)",
          "rgba(255, 255, 255, 0.09)",
          "rgba(255, 255, 255, 0.20)",
        ]
      : ["rgba(255, 255, 255, 0.00)", "rgba(255, 255, 255, 0.47)", "#FFFFFF"];

  const { user, error, loading } = useUser();

  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

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
            cumulative_value: user.cumulative_value,
            value_month_ago: user.value_month_ago,
            nickname: user.user_name,
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
      <Container
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          console.log("graph container layout");

          if (size.width !== width || size.height !== height) {
            setSize({ width, height });
          }
        }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: spacing.offset,
            // marginTop: spacing.padding,
          }}
        ></LinearGradient>
        <sizeContext.Provider value={size}>
          <HomeChart isCandleStick={isCandleStick} />
        </sizeContext.Provider>
      </Container>
    </View>
  );
};

export default GraphContainer;
