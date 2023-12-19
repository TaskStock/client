import React from "react";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import Button from "../../atoms/Button";
import useHeight from "../../../utils/useHeight";

const Container = styled.View`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: ${spacing.offset}px ${spacing.gutter}px
    ${({ paddingBottom }) => paddingBottom + spacing.offset}px;
  background-color: ${({ theme }) => theme.box};
`;

const HandleTodoContainer = () => {
  const { NOTCH_BOTTOM } = useHeight();
  return (
    <Container paddingBottom={NOTCH_BOTTOM}>
      <FlexBox justifyContent="space-between">
        <Button
          text="할 일 추가하기"
          onPress={() => {}}
          type="main"
          styles={{ width: "63%" }}
          disabled={false}
        />

        <Button
          text="수정"
          onPress={() => {}}
          type="sub"
          styles={{ width: "35%" }}
        />
      </FlexBox>
    </Container>
  );
};

export default HandleTodoContainer;
