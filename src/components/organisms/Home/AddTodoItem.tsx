import { View } from "react-native";
import FlexBox from "../../atoms/FlexBox";
import { spacing } from "../../../constants/spacing";
import Icons from "../../atoms/Icons";
import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { useAddSimpleTodoMutation } from "../../../store/modules/todo/todo";
import { useState } from "react";
import { useAppSelect } from "../../../store/configureStore.hooks";
import Text from "../../atoms/Text";
import useTodos from "../../../hooks/useTodos";

const AddTodoInput = styled.TextInput`
  background-color: ${({ theme }) => theme.box};
  font-size: ${useResponsiveFontSize(16)}px;
`;

const ErrorMsg = styled.View`
  position: absolute;
  bottom: ${useResponsiveFontSize(-10)}px;
  left: ${useResponsiveFontSize(38)}px;
`;

const AddTodoItem = () => {
  const [content, setContent] = useState("");
  const [addSimpleTodo, result] = useAddSimpleTodoMutation();
  const [error, setError] = useState<string | null>();

  const { currentDateString } = useAppSelect((state) => state.calendar);
  const { getAllTodoQueryArg } = useTodos();

  const theme = useTheme();

  const addTodo = () => {
    setError(null);
    if (content.length === 0) {
      setError("내용을 입력해주세요");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (content.length > 30) {
      setError("30자 이내로 입력해주세요");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    addSimpleTodo({
      content,
      add_date: currentDateString,
      queryArgs: {
        date: getAllTodoQueryArg.date,
      },
    });

    setContent("");
  };

  return (
    <View>
      <FlexBox
        alignItems="center"
        styles={{ paddingBottom: spacing.padding }}
        gap={10}
      >
        <Icons
          type="entypo"
          name="circle-with-plus"
          size={28}
          color={theme.text}
          onPress={() => {
            addTodo();
          }}
        />
        <AddTodoInput
          onSubmitEditing={() => {
            addTodo();
          }}
          placeholderTextColor={theme.textDim}
          value={content}
          placeholder="할일 추가"
          onChangeText={(text) => setContent(text)}
        />
        {error && (
          <ErrorMsg>
            <Text size="md" color={theme.palette.red}>
              {error}
            </Text>
          </ErrorMsg>
        )}
      </FlexBox>
    </View>
  );
};

export default AddTodoItem;
