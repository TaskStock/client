import React, { useContext } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useHeight from "../../../hooks/useHeight";
import { useAppSelect } from "../../../store/configureStore.hooks";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import Icons, { IconsPic } from "../../atoms/Icons";
import { useTheme } from "styled-components";

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

function HeaderTop({ navigation }) {
  const { setHeaderHeight } = useContext(ComponentHeightContext);

  const { NOTCH_TOP } = useHeight();
  const theme = useAppSelect((state) => state.theme.value);
  const styledTheme = useTheme();
  return (
    <Container
      notchTop={NOTCH_TOP}
      onLayout={(e) => {
        setHeaderHeight(e.nativeEvent.layout.height);
      }}
    >
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
          <IconsPic
            source={THEME_SOURCES[theme]?.bell}
            size={30}
            onPress={() => navigation.navigate("Alarm")}
          />
          <Icons
            type="feather"
            name="settings"
            size={26}
            onPress={() => {
              navigation.navigate("SettingsStack", { screen: "Settings" });
            }}
            color={styledTheme.text}
          />
        </FlexBox>
      </FlexBox>
    </Container>
  );
}

export default HeaderTop;
