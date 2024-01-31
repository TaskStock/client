import { View, Text } from "react-native";
import React from "react";
import HomeCalendar from "../../organisms/Home/HomeCalendar";
import useTodos from "../../../hooks/useTodos";
import { spacing } from "../../../constants/spacing";
import { Todo } from "../../../@types/todo";

export default function SnsDetailSecond({
  todos,
}: {
  todos: {
    data: Todo[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
}) {
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: spacing.offset,
      }}
    >
      <HomeCalendar data={todos.data}></HomeCalendar>
    </View>
  );
}
