import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";
import HomeUserInfo from "../molecules/Home/HomeUserInfo";
import HomeChart from "./Home/HomeChart";
import CandleStickIcon from "../../../assets/icons/CandleStickIcon.svg";
import LineChartIcon from "../../../assets/icons/lineChartIcon.svg";
import { WithLocalSvg } from "react-native-svg";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import FlexBox from "../atoms/FlexBox";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelect } from "../../store/configureStore.hooks";
import { Value } from "../../@types/chart";

const Container = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.padding}px;
  /* background-color: ${(props) => props.theme.box}; */
`;

const InnerContent = styled.View`
  width: 90%;
  height: 90%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const sizeContext = React.createContext({
  width: 0,
  height: 0,
});

const GraphWithUserInfo = ({
  userInfo,
  value,
}: {
  userInfo: {
    cumulative_value?: number;
    value_month_ago?: number;
    nickname?: string;
    loading: boolean;
    error: any;
  };
  value: {
    data?: Value[];
    isLoading: boolean;
    isError: boolean;
    error: any;
    refetch: () => void;
  };
}) => {
  const theme = useAppSelect((state) => state.theme);
  const gradient =
    theme.value === "dark"
      ? [
          "rgba(255, 255, 255, 0.00)",
          "rgba(255, 255, 255, 0.09)",
          "rgba(255, 255, 255, 0.20)",
        ]
      : ["rgba(255, 255, 255, 0.00)", "rgba(255, 255, 255, 0.47)", "#FFFFFF"];

  const [isCandleStick, setIsCandleStick] = React.useState(true);

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
            cumulative_value: userInfo.cumulative_value || 0,
            value_month_ago: userInfo.value_month_ago || 0,
            nickname: userInfo.nickname || "",
          }}
          isLoading={userInfo.loading}
          error={userInfo.error}
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
        <InnerContent
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;

            if (size.width !== width || size.height !== height) {
              setSize({ width, height });
            }
          }}
        >
          <sizeContext.Provider value={size}>
            <HomeChart
              value={{
                data: value.data,
                isLoading: value.isLoading,
                isError: value.isError,
                error: value.error,
                refetch: value.refetch,
              }}
              isCandleStick={isCandleStick}
            />
          </sizeContext.Provider>
        </InnerContent>
      </Container>
    </View>
  );
};

export default GraphWithUserInfo;
