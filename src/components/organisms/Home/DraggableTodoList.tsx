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
import useTodos from "../../../hooks/useTodos";

export default function DraggableTodoList({
  selectedProjectId,
}: {
  selectedProjectId: number | null;
}) {
  const [changeTodoOrder, result] = useChangeOrderTodoMutation();

  const { currentDateYYYYMMDD: currentDateFormat, currentDateString } =
    useAppSelect((state) => state.calendar);

  const { data: todos, getAllTodoQueryArg } = useTodos();

  const currentDayTodos = todos
    ? todos.filter((todo) => checkIsSameLocalDay(todo.date, currentDateFormat))
    : [];

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

    if (fromIndex < toIndex) {
      console.log("밑으로 내리기");

      // 이 경우에는 아이템을 내리는 경우.
      // 이 아이템의 원래 index보다 높은 index에 해당하는 친구들은,
      // 예를 들어서 todo index가 1,4,7,8,9 인 상황에서,
      // fromIndex가 1이고, toIndex가 4인 경우에는,
      // index가 4인 todo는 9로 바꾸고, 7은 4로, 8은 7로, 9는 8로 바꿔준다.
      // 그리고 이렇게 index가 바뀐 todo들을 changedTodos에 넣어준다.

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
      console.log(from_todo.content, from_todo.index, from_todo.todo_id);

      changedTodos.push({
        todo_id: from_todo.todo_id,
        changed_index: to_todo.index,
      });
    }

    if (changedTodos.length === 0) {
      return;
    }

    console.log(changedTodos);

    changeTodoOrder({
      selectedProjectId: selectedProjectId,
      changed_todos: params.data,
      original_todos: selectedTodos,
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

  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: useResponsiveFontSize(15),
      }}
    >
      <DraggableFlatList
        data={selectedTodos}
        renderItem={({ item, getIndex, drag, isActive }) =>
          renderTodoItem({ item, getIndex, drag, isActive })
        }
        keyExtractor={(item: Todo) => item.todo_id.toString()}
        onDragEnd={onDragEnd}
      ></DraggableFlatList>
      {/* <AddTodoItem /> */}
    </View>
  );
}
