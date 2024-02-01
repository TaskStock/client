import { View, Text } from "react-native";
import React from "react";
import HomeCalendar from "../../organisms/Home/HomeCalendar";
import useTodos from "../../../hooks/useTodos";
import { spacing } from "../../../constants/spacing";
import { Todo } from "../../../@types/todo";

export default function SnsDetailSecond({
  user: { value_yesterday_ago, cumulative_value },
  todos,
}: {
  todos: {
    data: Todo[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  user: {
    value_yesterday_ago: number | undefined;
    cumulative_value: number | undefined;
  };
}) {
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: spacing.offset,
      }}
    >
      <HomeCalendar
        user={{
          value_yesterday_ago: value_yesterday_ago || 0,
          cumulative_value: cumulative_value || 0,
        }}
        todos={todos}
      ></HomeCalendar>
    </View>
  );
}
