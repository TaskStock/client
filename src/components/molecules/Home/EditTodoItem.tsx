import React from "react";
import { useRecoilValue } from "recoil";
import { darkMode } from "../../../atom/theme";
import { darkTheme, grayTheme } from "../../../constants/colors";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Icons, { IconsPic } from "../../atoms/Icons";
import Text from "../../atoms/Text";

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
          onPress={() => {}}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default EditTodoItem;
