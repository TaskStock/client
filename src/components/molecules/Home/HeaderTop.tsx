import React, { useContext } from "react";
import { Image, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { palette } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import useHeight from "../../../hooks/useHeight";
import { useResizeLayoutOnFocus } from "../../../hooks/useResizeLayoutOnFocus";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { setNewNotice } from "../../../store/modules/user";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import Icons, { IconsPic } from "../../atoms/Icons";

const Container = styled.View<{ notchTop: number }>`
  background-color: ${({ theme }) => theme.background};
  padding-top: ${(props) => props.notchTop}px;
`;

const THEME_SOURCES = {
  dark: {
    logo: require("../../../../assets/images/logo-dark.png"),
    bell: require("../../../../assets/icons/bell-dark.png"),
  },
  gray: {
    logo: require("../../../../assets/images/logo-light.png"),
    bell: require("../../../../assets/icons/bell-light.png"),
  },
};

const NewAlarmDot = () => (
  <View
    style={{
      width: 7,
      height: 7,
      borderRadius: 7,
      backgroundColor: palette.red,
      position: "absolute",
      top: 4,
      right: 4,
    }}
  />
);

function HeaderTop({ navigation }) {
  const { setHeaderHeight } = useContext(ComponentHeightContext);
  const { is_new_notice } = useAppSelect((state) => state.user.user);
  const dispatch = useAppDispatch();

  const { NOTCH_TOP } = useHeight();
  const theme = useAppSelect((state) => state.theme.value);
  const styledTheme = useTheme();

  const onLayout = useResizeLayoutOnFocus({
    resizeFunction: setHeaderHeight,
  });

  return (
    <Container notchTop={NOTCH_TOP} onLayout={onLayout}>
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        styles={{
          paddingHorizontal: spacing.gutter,
          paddingTop: spacing.offset,
          paddingBottom: spacing.offset,
        }}
      >
        <Image
          source={THEME_SOURCES[theme]?.logo}
          style={{
            width: useResponsiveFontSize(134),
            height: useResponsiveFontSize(18),
            resizeMode: "contain",
          }}
        />
        <FlexBox gap={spacing.offset} alignItems="center">
          <View>
            <IconsPic
              source={THEME_SOURCES[theme]?.bell}
              size={30}
              onPress={() => {
                navigation.navigate("AlarmStack", {
                  screen: "Alarm",
                });
                dispatch(setNewNotice(false));
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
            {is_new_notice && <NewAlarmDot />}
          </View>
          <Icons
            type="feather"
            name="settings"
            size={26}
            onPress={() => {
              navigation.navigate("SettingsStack", { screen: "Settings" });
            }}
            color={styledTheme.text}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
        </FlexBox>
      </FlexBox>
    </Container>
  );
}

export default HeaderTop;
