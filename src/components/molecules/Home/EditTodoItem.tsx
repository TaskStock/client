import React from "react";
import { useSelector } from "react-redux";
import { darkTheme, grayTheme } from "../../../constants/colors";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Icons, { IconsPic } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { RootState } from "../../../store/configureStore";

const THEME_CONSTANTS = {
  dark: {
    ordering: require("../../../../assets/icons/ordering-dark.png"),
    high: darkTheme.high,
    textDimmer: darkTheme.textDimmer,
  },
  gray: {
    ordering: require("../../../../assets/icons/ordering-light.png"),
    high: grayTheme.high,
    textDimmer: grayTheme.textDimmer,
  },
};

const EditTodoItem = ({ todo }) => {
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      styles={{ paddingBottom: 10 }}
    >
      <FlexBox gap={10} alignItems="center">
        <IconsPic source={THEME_CONSTANTS[theme]?.ordering} size={30} />
        <Text size="md">{todo.text}</Text>
      </FlexBox>
      <FlexBox gap={10} alignItems="center">
        {todo.check ? (
          <Text size="md" color={THEME_CONSTANTS[theme]?.high}>
            +{numberWithCommas(todo.level * 1000)}원
          </Text>
        ) : (
          <Text size="md">{numberWithCommas(todo.level * 1000)}원</Text>
        )}
        <Icons
          type="material"
          name="dots-horizontal"
          size={24}
          color={THEME_CONSTANTS[theme]?.textDimmer}
          onPress={() => {}}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default EditTodoItem;
