import React from "react";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";
import Icons from "../../atoms/Icons";

const Container = styled.TouchableOpacity<{ selected: boolean }>`
  padding: ${spacing.offset}px ${useResponsiveFontSize(7)}px
    ${spacing.offset - 3}px;
  border-bottom-width: ${useResponsiveFontSize(3)}px;
  border-bottom-color: ${({ theme, selected }) =>
    selected ? theme.text : "transparent"};
  flex-direction: row;
  align-items: center;
  gap: ${spacing.small}px;
`;

const ProjectSelectBtn = ({
  projectName,
  selected,
  onPress,
  publicRange,
}: {
  projectName: string;
  selected: boolean;
  onPress: () => void;
  publicRange: string;
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
      {publicRange === "none" && (
        <Icons
          type="materialIcons"
          name="lock-outline"
          color={selected ? theme.text : theme.textDimmer}
        />
      )}
    </Container>
  );
};

export default ProjectSelectBtn;
