import React from "react";
import { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Icons, { IconsPic } from "../../atoms/Icons";
import Text from "../../atoms/Text";

const THEME_CONSTANTS = {
  dark: {
    ordering: require("../../../../assets/icons/ordering-dark.png"),
  },
  gray: {
    ordering: require("../../../../assets/icons/ordering-light.png"),
  },
};

const EditTodoItem = ({
  todo,
}: {
  todo: {
    text: string;
    level: number;
    check: boolean;
  };
}) => {
  const theme = useAppSelect((state) => state.theme.value);
  const styledTheme = useTheme();

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      styles={{ paddingBottom: spacing.padding }}
    >
      <FlexBox gap={10} alignItems="center">
        <IconsPic source={THEME_CONSTANTS[theme]?.ordering} size={30} />
        <Text size="md">{todo.text}</Text>
      </FlexBox>
      <FlexBox gap={10} alignItems="center">
        {todo.check ? (
          <Text size="md" color={styledTheme.high}>
            +{numberWithCommas(todo.level * 1000)}원
          </Text>
        ) : (
          <Text size="md">{numberWithCommas(todo.level * 1000)}원</Text>
        )}
        <Icons
          type="material"
          name="dots-horizontal"
          size={24}
          color={styledTheme.textDimmer}
          onPress={() => {}}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default EditTodoItem;
