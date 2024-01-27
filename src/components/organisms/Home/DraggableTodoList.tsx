import { View, Pressable } from "react-native";

import React from "react";
import { Todo } from "../../../@types/todo";
import TodoItem from "../../molecules/Home/TodoItem";
import DraggableFlatList, {
  DragEndParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import {
  useChangeOrderTodoMutation,
  useGetAllTodosQuery,
} from "../../../store/modules/todo/todo";
import { useAppSelect } from "../../../store/configureStore.hooks";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import useTodos from "../../../hooks/useTodos";
import Text from "../../atoms/Text";
import Margin from "../../atoms/Margin";
import CenterLayout from "../../atoms/CenterLayout";
import LoadingSpinner from "../../atoms/LoadingSpinner";

export default function DraggableTodoList({
  selectedProjectId,
}: {
  selectedProjectId: number | null;
}) {
  const [changeTodoOrder, result] = useChangeOrderTodoMutation();

  const { currentDateString } = useAppSelect((state) => state.calendar);

  const {
    data: todos,
    currentDayTodos,
    getAllTodoQueryArg,
    isLoading,
    isError,
    refetch,
  } = useTodos();

  const selectedTodos =
    selectedProjectId !== null
      ? currentDayTodos.filter((todo) => todo.project_id === selectedProjectId)
      : currentDayTodos;

  const onDragEnd = (params: DragEndParams<Todo>) => {
    // 이 index는 부분 array에서의 index다.
    const toIndex = params.to;
    const fromIndex = params.from;

    let changedTodos: {
      todo_id: number;
      changed_index: number;
    }[] = [];

    const from_todo = selectedTodos[fromIndex];
    const to_todo = selectedTodos[toIndex];

    // 그 해당하는 아이템들끼리의 index를 바꿔주는 것
    if (fromIndex < toIndex) {
      console.log("밑으로 내리기");

      for (let i = fromIndex + 1; i <= toIndex; i++) {
        const original_todo = selectedTodos[i];
        const target_todo = selectedTodos[i - 1];
        changedTodos.push({
          todo_id: original_todo.todo_id,
          changed_index: target_todo.index,
        });
      }

      // 그다음 마지막으로 from_todo의 index를 to_todo의 index로 바꿔준다.
    } else if (fromIndex > toIndex) {
      console.log("위로 올리기");

      // 1,4,8,9,10 인 상황에서, 10을 4로 올리는 경우.
      for (let i = fromIndex - 1; i >= toIndex; i--) {
        const original_todo = selectedTodos[i];
        const target_todo = selectedTodos[i + 1];
        changedTodos.push({
          todo_id: original_todo.todo_id,
          changed_index: target_todo.index,
        });
      }
    }

    if (from_todo.index !== to_todo.index) {
      changedTodos.push({
        todo_id: from_todo.todo_id,
        changed_index: to_todo.index,
      });
    }

    if (changedTodos.length === 0) {
      return;
    }

    console.log("changedTodos", changedTodos);

    changeTodoOrder({
      selectedProjectId: selectedProjectId,
      current_day_todos: currentDayTodos,
      changed_todos_item: changedTodos,
      requested_date_full: currentDateString,
      queryArgs: {
        requested_date: getAllTodoQueryArg.date,
      },
    });
  };

  const renderTodoItem = ({ item, getIndex, drag, isActive }) => {
    if (selectedProjectId !== null && item.project_id !== selectedProjectId) {
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

  return !isLoading ? (
    !isError ? (
      todos && (
        <View
          style={{
            paddingHorizontal: spacing.gutter,
            paddingTop: useResponsiveFontSize(15),
          }}
        >
          {selectedTodos.length === 0 ? (
            <Text size="md">여기에는 투두가 없어요</Text>
          ) : (
            <DraggableFlatList
              data={selectedTodos}
              renderItem={({ item, getIndex, drag, isActive }) =>
                renderTodoItem({ item, getIndex, drag, isActive })
              }
              keyExtractor={(item: Todo) => item.todo_id.toString()}
              onDragEnd={onDragEnd}
            ></DraggableFlatList>
          )}
        </View>
      )
    ) : (
      <CenterLayout>
        <Text size="md">할일을 불러오는 중 에러가 발생했어요</Text>
        <Margin margin={5} />
        <Pressable
          onPress={() => {
            refetch();
          }}
        >
          <Text size="md">다시 로드하기</Text>
        </Pressable>
      </CenterLayout>
    )
  ) : (
    <CenterLayout>
      <LoadingSpinner />
    </CenterLayout>
  );
}
