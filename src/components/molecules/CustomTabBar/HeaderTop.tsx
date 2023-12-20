import React from "react";
import { Image, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { themeSlice } from "../../../store/modules/theme";
import useHeight from "../../../utils/useHeight";
import FlexBox from "../../atoms/FlexBox";
import { IconsPic } from "../../atoms/Icons";

function HeaderTop() {
  const { NOTCH_TOP, HEADER_HEIGHT } = useHeight();
  const theme = useSelector((state) => state.theme.value);

  // const setTheme = useSetRecoilState(darkMode);
  const dispatch = useDispatch();
  const switchToDarkMode = () => {
    // setTheme((prevTheme) => !prevTheme);
    dispatch(themeSlice.actions.setTheme("dark"));
  };
  const switchToGrayMode = () => {
    dispatch(themeSlice.actions.setTheme("gray"));
  };

  const LOGO_SRC =
    theme === "dark"
      ? require("../../../../assets/images/logo-dark.png")
      : require("../../../../assets/images/logo-light.png");

  const BELL_SRC =
    theme === "dark"
      ? require("../../../../assets/icons/bell-dark.png")
      : require("../../../../assets/icons/bell-light.png");

  const PERSON_SRC =
    theme === "dark"
      ? require("../../../../assets/icons/person-dark.png")
      : require("../../../../assets/icons/person-light.png");

  return (
    <View
      style={{
        backgroundColor:
          theme === "dark" ? darkTheme.background : grayTheme.background,
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
          <IconsPic source={BELL_SRC} size={30} onPress={switchToDarkMode} />
          <IconsPic source={PERSON_SRC} size={30} onPress={switchToGrayMode} />
        </FlexBox>
      </FlexBox>
    </View>
  );
}

export default HeaderTop;
