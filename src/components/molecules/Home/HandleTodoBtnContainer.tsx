import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import useHeight from "../../../utils/useHeight";
import Button from "../../atoms/Button";
import FlexBox from "../../atoms/FlexBox";
import { RootState } from "../../../store/configureStore";
import { toggleAddModal } from "../../../store/modules/todo";

const THEME_CONSTANTS = {
  dark: {
    text: darkTheme.text,
    textReverse: darkTheme.textReverse,
    subBtnGray: darkTheme.subBtnGray,
  },
  gray: {
    text: grayTheme.text,
    textReverse: grayTheme.textReverse,
    subBtnGray: grayTheme.subBtnGray,
  },
};

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
  const theme = useSelector((state: RootState) => state.theme.value);
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
          color={editEnabled ? THEME_CONSTANTS[theme]?.textReverse : undefined}
          styles={{
            width: "35%",
            backgroundColor: editEnabled
              ? THEME_CONSTANTS[theme]?.text
              : THEME_CONSTANTS[theme]?.subBtnGray,
          }}
        />
      </FlexBox>
    </Container>
  );
};

export default HandleTodoBtnContainer;
