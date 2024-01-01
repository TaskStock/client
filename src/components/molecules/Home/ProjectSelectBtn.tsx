import React from "react";
import styled from "styled-components/native";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";

const THEME_CONSTANTS = {
  dark: {
    text: darkTheme.text,
    textDimmer: darkTheme.textDimmer,
  },
  gray: {
    text: grayTheme.text,
    textDimmer: grayTheme.textDimmer,
  },
};

const Container = styled.TouchableOpacity`
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
  const theme = useAppSelect((state) => state.theme.value);

  return (
    <Container onPress={onPress} selected={selected}>
      <Text
        size="md"
        weight={selected ? "bold" : "regular"}
        color={
          selected
            ? THEME_CONSTANTS[theme]?.text
            : THEME_CONSTANTS[theme]?.textDimmer
        }
      >
        {projectName}
      </Text>
    </Container>
  );
};

export default ProjectSelectBtn;
