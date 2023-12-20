import { View } from "react-native";
import React from "react";
import { darkMode } from "../../../atom/theme";
import { useRecoilValue } from "recoil";
import FlexBox from "../../atoms/FlexBox";
import Icons, { IconsPic } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import { darkTheme, grayTheme } from "../../../constants/colors";

const EditTodoItem = ({ todo }) => {
  const isDark = useRecoilValue(darkMode);
  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      styles={{ paddingBottom: 10 }}
    >
      <FlexBox gap={10} alignItems="center">
        {isDark ? (
          <IconsPic
            source={require("../../../../assets/icons/ordering-dark.png")}
            size={30}
          />
        ) : (
          <IconsPic
            source={require("../../../../assets/icons/ordering-light.png")}
            size={30}
          />
        )}

        <Text size="md">{todo.text}</Text>
      </FlexBox>
      <FlexBox gap={10} alignItems="center">
        {todo.check ? (
          <Text size="md" color={darkTheme.high}>
            +{numberWithCommas(todo.level * 1000)}원
          </Text>
        ) : (
          <Text size="md">{numberWithCommas(todo.level * 1000)}원</Text>
        )}
        <Icons
          type="material"
          name="dots-horizontal"
          size={24}
          color={isDark ? darkTheme.textDimmer : grayTheme.textDimmer}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default EditTodoItem;
