import React, { forwardRef, useRef } from "react";
import { TextInput as RNTextInput, TextInputProps, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { grayTheme } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Text from "./Text";

interface ITextInput extends TextInputProps {
  subText?: any;
  placeholder: string;
  alert?: boolean;
  alertText?: any;
}

const Container = styled.Pressable<{ alert: boolean; onPress: () => void }>`
  border: 1px solid
    ${(props) =>
      props.alert ? props.theme.alert : props.theme.textInputBorder};
  border-radius: ${useResponsiveFontSize(6)}px;
  width: 100%;
  padding: ${useResponsiveFontSize(8)}px;
  gap: ${useResponsiveFontSize(7)}px;
  margin-bottom: ${(props) => (props.alert ? 0 : spacing.padding)}px;
  background-color: ${(props) => props.theme.textInput};
`;

const Input = styled(
  forwardRef<RNTextInput, TextInputProps>((props, ref) => (
    <RNTextInput ref={ref} {...props} />
  ))
)`
  font-size: ${useResponsiveFontSize(14)}px;
  color: ${(props) => props.theme.text};
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
  const theme = useTheme();
  const inputRef = useRef<RNTextInput>(null);
  return (
    <>
      <Container alert={alert} onPress={() => inputRef.current?.focus()}>
        <Text size="xs" color={theme.textDim}>
          {subText}
        </Text>
        <Input
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={theme.textDim}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
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
          <Text size="xs" color={theme.alert}>
            {alertText}
          </Text>
        </View>
      )}
    </>
  );
};

export default TextInput;
