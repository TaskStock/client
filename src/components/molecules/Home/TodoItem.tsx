import React, { useState } from "react";
import { useSelector } from "react-redux";
import { darkTheme } from "../../../constants/colors";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import CheckBox from "../../atoms/CheckBox";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";

const TodoItem = ({ todo }) => {
  const [checked, setChecked] = useState(todo.check);
  const theme = useSelector((state) => state.theme.value);

  const checkedBoxSrc =
    theme === "dark"
      ? require("../../../../assets/icons/checked-dark.png")
      : require("../../../../assets/icons/checked-light.png");
  const uncheckedBoxSrc =
    theme === "dark"
      ? require("../../../../assets/icons/unchecked-dark.png")
      : require("../../../../assets/icons/unchecked-light.png");

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      styles={{ paddingBottom: 10 }}
    >
      <FlexBox gap={10} alignItems="center">
        {checked ? (
          <CheckBox
            src={checkedBoxSrc}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        ) : (
          <CheckBox
            src={uncheckedBoxSrc}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        )}

        <Text size="md">{todo.text}</Text>
      </FlexBox>
      {checked ? (
        <Text size="md" color={darkTheme.high}>
          +{numberWithCommas(todo.level * 1000)}원
        </Text>
      ) : (
        <Text size="md">{numberWithCommas(todo.level * 1000)}원</Text>
      )}
    </FlexBox>
  );
};

export default TodoItem;
