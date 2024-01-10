import { View, Text, Pressable } from "react-native";
import React from "react";
import { Todo } from "../../../@types/todo";
import TodoItem from "../../molecules/Home/TodoItem";
import AddTodoItem from "./AddTodoItem";
import DraggableFlatList, {
  DragEndParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import {
  useChangeOrderTodoMutation,
  useGetAllTodosQuery,
} from "../../../store/modules/todo/todo";
import { useAppSelect } from "../../../store/configureStore.hooks";
import { DateString } from "../../../@types/calendar";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { checkIsSameLocalDay } from "../../../utils/checkIsSameLocalDay";

export default function DraggableTodoList({
  selectedProject,
}: {
  selectedProject: number | null;
}) {
  const [changeTodoOrder, result] = useChangeOrderTodoMutation();

  const { currentDateYYYYMMDD: currentDateFormat, currentDateString } =
    useAppSelect((state) => state.calendar);

  const { data } = useGetAllTodosQuery({
    date: currentDateFormat as DateString,
  });

  const todosData =
    data && data.todos
      ? data.todos.filter((todo) =>
          checkIsSameLocalDay(todo.date, currentDateFormat)
        )
      : [];

  const onDragEnd = (params: DragEndParams<Todo>) => {
    // 이 index는 부분 array에서의 index다.
    const toIndex = params.to;
    const fromIndex = params.from;

    changeTodoOrder({
      todo_id: todosData[fromIndex].todo_id,
      from_index: fromIndex,
      to_index: toIndex,
      changed_todos: params.data,
      requested_date_full: currentDateString,
      queryArgs: {
        requested_date: currentDateFormat,
      },
    });
  };

  const renderTodoItem = ({ item, getIndex, drag, isActive }) => {
    if (selectedProject !== null && item.project_id !== selectedProject) {
      return null;
    }

    return (
      <ScaleDecorator>
        <Pressable onLongPress={drag}>
          <TodoItem key={item.todo_id} todo={item} />
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: useResponsiveFontSize(15),
      }}
    >
      <DraggableFlatList
        data={todosData}
        renderItem={({ item, getIndex, drag, isActive }) =>
          renderTodoItem({ item, getIndex, drag, isActive })
        }
        keyExtractor={(item: Todo) => item.todo_id.toString()}
        onDragEnd={onDragEnd}
      ></DraggableFlatList>
      <AddTodoItem />
    </View>
  );
}
