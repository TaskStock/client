import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { darkMode } from "../../../atom/theme";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import useHeight from "../../../utils/useHeight";
import Button from "../../atoms/Button";
import FlexBox from "../../atoms/FlexBox";

const Container = styled.View`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: ${spacing.offset}px ${spacing.gutter}px
    ${({ paddingBottom }) => paddingBottom + spacing.offset}px;
  background-color: ${({ theme }) => theme.box};
`;

const HandleTodoBtnContainer = ({ editEnabled, setEditEnabled }) => {
  const { NOTCH_BOTTOM } = useHeight();
  const isDark = useRecoilValue(darkMode);

  return (
    <Container paddingBottom={NOTCH_BOTTOM}>
      <FlexBox justifyContent="space-between">
        <Button
          text="할 일 추가하기"
          onPress={() => {}}
          styles={{ width: "63%" }}
          disabled={editEnabled}
        />

        <Button
          text={editEnabled ? "수정완료" : "수정"}
          onPress={() => {
            setEditEnabled(!editEnabled);
          }}
          color={
            editEnabled
              ? isDark
                ? darkTheme.textReverse
                : grayTheme.textReverse
              : undefined
          }
          styles={{
            width: "35%",
            backgroundColor: editEnabled
              ? isDark
                ? darkTheme.text
                : grayTheme.text
              : isDark
              ? darkTheme.subBtnGray
              : grayTheme.subBtnGray,
          }}
        />
      </FlexBox>
    </Container>
  );
};

export default HandleTodoBtnContainer;
