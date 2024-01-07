import React from "react";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";

const Container = styled.TouchableOpacity<{ selected: boolean }>`
  padding: ${spacing.offset}px ${useResponsiveFontSize(7)}px
    ${spacing.offset - 3}px;
  border-bottom-width: ${useResponsiveFontSize(3)}px;
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
  const theme = useTheme();

  return (
    <Container onPress={onPress} selected={selected}>
      <Text
        size="md"
        weight={selected ? "bold" : "regular"}
        color={selected ? theme.text : theme.textDimmer}
      >
        {projectName}
      </Text>
    </Container>
  );
};

export default ProjectSelectBtn;
