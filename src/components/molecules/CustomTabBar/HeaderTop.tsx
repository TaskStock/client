import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";
import useHeight from "../../../utils/useHeight";
import { darkTheme, grayTheme } from "../../../constants/colors";
import FlexBox from "../../atoms/FlexBox";
import { IconsPic } from "../../atoms/Icons";
import { spacing } from "../../../constants/spacing";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { darkMode } from "../../../atom/theme";

function HeaderTop() {
  const { NOTCH_TOP, HEADER_HEIGHT } = useHeight();
  const isDark = useRecoilValue(darkMode);

  const setTheme = useSetRecoilState(darkMode);
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const LOGO_SRC = isDark
    ? require("../../../../assets/images/logo-dark.png")
    : require("../../../../assets/images/logo-light.png");

  const BELL_SRC = isDark
    ? require("../../../../assets/icons/bell-dark.png")
    : require("../../../../assets/icons/bell-light.png");

  const PERSON_SRC = isDark
    ? require("../../../../assets/icons/person-dark.png")
    : require("../../../../assets/icons/person-light.png");

  return (
    <View
      style={{
        backgroundColor: isDark ? darkTheme.background : grayTheme.background,
        paddingTop: NOTCH_TOP,
      }}
    >
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        styles={{
          paddingHorizontal: spacing.gutter,
          paddingVertical: spacing.offset,
        }}
      >
        <Image
          source={LOGO_SRC}
          style={{
            width: 134,
            height: 18,
            resizeMode: "contain",
          }}
        />
        <FlexBox gap={spacing.offset} alignItems="center">
          <TouchableOpacity onPress={toggleTheme}>
            <IconsPic source={BELL_SRC} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconsPic source={PERSON_SRC} size={30} />
          </TouchableOpacity>
        </FlexBox>
      </FlexBox>
    </View>
  );
}

export default HeaderTop;
