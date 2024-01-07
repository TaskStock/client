import React from "react";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useHeight from "../../../hooks/useHeight";
import { toggleAddModal } from "../../../store/modules/todo";
import Button from "../../atoms/Button";
import FlexBox from "../../atoms/FlexBox";

const Container = styled.View<{ paddingBottom: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: ${spacing.offset}px ${spacing.gutter}px
    ${({ paddingBottom }) => paddingBottom + spacing.offset}px;
  background-color: ${({ theme }) => theme.box};
`;

const HandleTodoBtnContainer = ({ editEnabled, setEditEnabled }) => {
  const { NOTCH_BOTTOM } = useHeight();
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Container paddingBottom={NOTCH_BOTTOM}>
      <FlexBox justifyContent="space-between">
        <Button
          text="할 일 추가하기"
          onPress={() => {
            dispatch(toggleAddModal());
          }}
          styles={{ width: "63%" }}
          disabled={editEnabled}
        />

        <Button
          text={editEnabled ? "수정완료" : "수정"}
          onPress={() => {
            setEditEnabled(!editEnabled);
          }}
          color={editEnabled ? theme.textReverse : undefined}
          styles={{
            width: "35%",
            backgroundColor: editEnabled ? theme.text : theme.subBtnGray,
          }}
        />
      </FlexBox>
    </Container>
  );
};

export default HandleTodoBtnContainer;
