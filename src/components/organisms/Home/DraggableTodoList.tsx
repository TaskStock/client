import { View, Text, Pressable } from "react-native";
import React from "react";
import { Todo } from "../../../@types/todo";
import TodoItem from "../../molecules/Home/TodoItem";
import AddTodoItem from "./AddTodoItem";
import DraggableFlatList, {
  DragEndParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useChangeOrderTodoMutation } from "../../../store/modules/todo/todo";
import { useAppSelect } from "../../../store/configureStore.hooks";

export default function DraggableTodoList({
  todosData,
  selectedProject,
}: {
  todosData: Todo[];
  selectedProject: number | null;
}) {
  const [changeTodoOrder, result] = useChangeOrderTodoMutation();

  const currentDateFormat = useAppSelect(
    (state) => state.calendar.currentDateYYYYMMDD
  );

  const onDragEnd = (params: DragEndParams<Todo>) => {
    const toIndex = params.to;
    const fromIndex = params.from;

    changeTodoOrder({
      todo_id: todosData[fromIndex].todo_id,
      changed_todos: params.data,
      changed_index: toIndex,
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
    <>
      <DraggableFlatList
        data={todosData}
        renderItem={({ item, getIndex, drag, isActive }) =>
          renderTodoItem({ item, getIndex, drag, isActive })
        }
        keyExtractor={(item: Todo) => item.todo_id.toString()}
        onDragEnd={onDragEnd}
      >
        {/* {todosData.map((todo) => {
          if (selectedProject !== null && todo.project_id !== selectedProject)
            return null;

          return (
            <Pressable onPress={drag}>
              <TodoItem key={todo.todo_id} todo={todo} />
            </Pressable>
          );
        })} */}
      </DraggableFlatList>
      <AddTodoItem />
    </>
  );
}
