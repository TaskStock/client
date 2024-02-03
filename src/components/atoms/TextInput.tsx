import React, { forwardRef, useRef } from "react";
import { TextInput as RNTextInput, TextInputProps, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Text from "./Text";

interface ITextInput extends TextInputProps {
  subText?: any;
  placeholder: string;
  alert?: boolean;
  alertText?: any;
  numberOfLines?: number;
  minHeight?: number;
}

const Container = styled.Pressable<{
  alert: boolean;
  onPress: () => void;
  minHeight?: number;
}>`
  min-height: ${(props) => (props.minHeight ? props.minHeight : 0)}px;
  border: 1px solid
    ${(props) =>
      props.alert ? props.theme.alert : props.theme.textInputBorder};
  border-radius: ${useResponsiveFontSize(6)}px;
  width: 100%;
  padding: ${useResponsiveFontSize(15)}px;
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
  numberOfLines = 1,
  minHeight,
  ...props
}) => {
  const theme = useTheme();
  const inputRef = useRef<RNTextInput>(null);
  return (
    <>
      <Container
        minHeight={minHeight}
        alert={alert}
        onPress={() => inputRef.current?.focus()}
      >
        <Text size="xs" color={theme.textDim}>
          {subText}
        </Text>
        <Input
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={theme.textDim}
          value={value}
          numberOfLines={numberOfLines}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false} // iOS only
          autoComplete="off" // Android only
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

export const TextAreaInput = ({
  subText,
  placeholder,
  value,
  onChangeText,
  alert = false,
  alertText,
  numberOfLines = 1,
  minHeight,
  ...props
}: ITextInput) => {
  const theme = useTheme();
  const inputRef = useRef<RNTextInput>(null);
  return (
    <>
      <Container
        minHeight={minHeight}
        alert={alert}
        onPress={() => inputRef.current?.focus()}
      >
        <Input
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={theme.textDim}
          value={value}
          numberOfLines={numberOfLines}
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

export const TextInputWithBorder = styled.TextInput`
  border-color: ${({ theme }) => theme.textDimmer};
  border-bottom-width: 1px;
  padding: 6px 1px;
  color: ${({ theme }) => theme.text};
`;

export default TextInput;
