import React from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { RootState } from "../../../store/configureStore";
import { themeSlice } from "../../../store/modules/theme";
import useHeight from "../../../utils/useHeight";
import FlexBox from "../../atoms/FlexBox";
import { IconsPic } from "../../atoms/Icons";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const Container = styled.View<{ notchTop: number }>`
  background-color: ${({ theme }) => theme.background};
  padding-top: ${(props) => props.notchTop}px;
`;

const THEME_SOURCES = {
  dark: {
    logo: require("../../../../assets/images/logo-dark.png"),
    bell: require("../../../../assets/icons/bell-dark.png"),
    person: require("../../../../assets/icons/person-dark.png"),
  },
  gray: {
    logo: require("../../../../assets/images/logo-light.png"),
    bell: require("../../../../assets/icons/bell-light.png"),
    person: require("../../../../assets/icons/person-light.png"),
  },
};

function HeaderTop() {
  const { NOTCH_TOP } = useHeight();
  const theme = useSelector((state: RootState) => state.theme.value);

  const dispatch = useDispatch();
  const switchToDarkMode = () => {
    dispatch(themeSlice.actions.setTheme("dark"));
  };
  const switchToGrayMode = () => {
    dispatch(themeSlice.actions.setTheme("gray"));
  };

  return (
    <Container notchTop={NOTCH_TOP}>
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        styles={{
          paddingHorizontal: spacing.gutter,
          paddingTop: spacing.offset,
          paddingBottom: spacing.padding,
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
            onPress={switchToDarkMode}
          />
          <IconsPic
            source={THEME_SOURCES[theme]?.person}
            size={30}
            onPress={switchToGrayMode}
          />
        </FlexBox>
      </FlexBox>
    </Container>
  );
}

export default HeaderTop;
