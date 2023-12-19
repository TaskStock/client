import React from "react";
import Text from "../../atoms/Text";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { useRecoilValue } from "recoil";
import { darkMode } from "../../../atom/theme";

const Container = styled.TouchableOpacity`
  padding: ${spacing.offset}px 7px ${spacing.offset - 3}px;
  border-bottom-width: 3px;
  border-bottom-color: ${({ theme, selected }) =>
    selected ? theme.text : "transparent"};
`;

const ProjectSelectBtn = ({
  projectName,
  selected,
  onPress,
}: {
  projectName: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const isDark = useRecoilValue(darkMode);
  return (
    <Container onPress={onPress} selected={selected}>
      <Text
        size="md"
        weight={selected ? "bold" : "regular"}
        color={
          selected
            ? isDark
              ? darkTheme.text
              : grayTheme.text
            : isDark
            ? darkTheme.textDimmer
            : grayTheme.textDimmer
        }
      >
        {projectName}
      </Text>
    </Container>
  );
};

export default ProjectSelectBtn;
