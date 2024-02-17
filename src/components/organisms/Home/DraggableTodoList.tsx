import { Pressable, View } from "react-native";
import React from "react";
import DraggableFlatList, {
  DragEndParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useTheme } from "styled-components";
import { Todo } from "../../../@types/todo";
import { spacing } from "../../../constants/spacing";
import useTodos from "../../../hooks/useTodos";
import { useAppSelect } from "../../../store/configureStore.hooks";
import { useChangeOrderTodoMutation } from "../../../store/modules/todo/todo";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import CheckBox from "../../atoms/CheckBox";
import CustomSkeleton from "../../atoms/CustomSkeleton";
import FlexBox from "../../atoms/FlexBox";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import TodoItem from "../../molecules/Home/TodoItem";

const SkeletonTodoItem = () => {
  const theme = useTheme();

  const checkBoxSrc =
    theme.name === "dark"
      ? require("../../../../assets/icons/unchecked-dark.png")
      : require("../../../../assets/icons/unchecked-light.png");

  return (
    <FlexBox
      direction="row"
      alignItems="center"
      styles={{ paddingBottom: spacing.padding }}
      gap={spacing.small}
    >
      <CheckBox src={checkBoxSrc} onPress={() => {}}></CheckBox>
      <CustomSkeleton>
        <SkeletonPlaceholder.Item
          width={250}
          height={useResponsiveFontSize(17)}
        />
      </CustomSkeleton>
    </FlexBox>
  );
};

export const ListContainer = ({ children }) => {
  return (
    <View
      style={{
        paddingTop: useResponsiveFontSize(15),
      }}
    >
      {children}
    </View>
  );
};

export default function DraggableTodoList({
  selectedProjectId,
}: {
  selectedProjectId: number | null;
}) {
  const [changeTodoOrder, result] = useChangeOrderTodoMutation();
  const theme = useTheme();

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
        <Pressable
          onLongPress={drag}
          style={{ paddingHorizontal: spacing.gutter }}
        >
          <TodoItem key={item.todo_id} todo={item} />
        </Pressable>
      </ScaleDecorator>
    );
  };

  if (isLoading) {
    return (
      <ListContainer>
        <SkeletonTodoItem />
        <SkeletonTodoItem />
      </ListContainer>
    );
  }

  if (isError) {
    return (
      <ListContainer>
        <FlexBox direction="column" alignItems="center">
          <Text size="md">할일을 불러오는 중 에러가 발생했어요</Text>
          <Margin margin={5} />
          <Pressable
            onPress={() => {
              refetch();
            }}
          >
            <Text size="md">다시 로드하기</Text>
          </Pressable>
        </FlexBox>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {todos && selectedTodos.length === 0 ? (
        <FlexBox
          direction="column"
          alignItems="center"
          gap={spacing.padding}
          styles={{ paddingTop: spacing.padding }}
        >
          <Text size="md" color={theme.textDim}>
            오늘은 할 일이 없어요.
          </Text>
          <Text size="md" color={theme.textDim}>
            + 버튼을 눌러 할 일을 추가해보세요.
          </Text>
        </FlexBox>
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
    </ListContainer>
  );
}
