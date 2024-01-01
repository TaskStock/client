import React from "react";
import styled from "styled-components/native";
import { darkTheme, grayTheme } from "../../constants/colors";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Text from "./Text";
import { TextInputProps, View } from "react-native";
import { spacing } from "../../constants/spacing";

const THEME_CONSTANTS = {
  dark: {
    subTextColor: darkTheme.textDim,
  },
  gray: {
    subTextColor: grayTheme.textDim,
  },
};

interface ITextInput extends TextInputProps {
  subText?: string;
  placeholder: string;
  alert?: boolean;
  alertText?: string;
}

const Container = styled.View<{ alert: boolean }>`
  border: 1px solid
    ${(props) => (props.alert ? props.theme.alert : props.theme.textDim)};
  border-radius: ${useResponsiveFontSize(6)}px;
  width: 100%;
  padding: ${useResponsiveFontSize(8)}px;
  gap: ${useResponsiveFontSize(7)}px;
  margin-bottom: ${(props) => (props.alert ? 0 : spacing.padding)}px;
`;

const Input = styled.TextInput`
  font-size: ${useResponsiveFontSize(14)}px;
`;

const TextInput: React.FC<ITextInput> = ({
  subText,
  placeholder,
  value,
  onChangeText,
  alert = false,
  alertText,
  ...props
}) => {
  const theme = useAppSelect((state) => state.theme.value);
  return (
    <>
      <Container alert={alert}>
        <Text size="xs" color={THEME_CONSTANTS[theme].subTextColor}>
          {subText}
        </Text>
        <Input
          placeholder={placeholder}
          placeholderTextColor={THEME_CONSTANTS[theme].subTextColor}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      </Container>
      {alert && (
        <View
          style={{
            paddingVertical: useResponsiveFontSize(3),
            width: "100%",
          }}
        >
          <Text size="xs" color={grayTheme.alert}>
            {alertText}
          </Text>
        </View>
      )}
    </>
  );
};

export default TextInput;
