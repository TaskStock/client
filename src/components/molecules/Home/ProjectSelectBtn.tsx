import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import Text from "../../atoms/Text";

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
  const theme = useSelector((state) => state.theme.value);
  return (
    <Container onPress={onPress} selected={selected}>
      <Text
        size="md"
        weight={selected ? "bold" : "regular"}
        color={
          selected
            ? theme === "dark"
              ? darkTheme.text
              : grayTheme.text
            : theme === "dark"
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
