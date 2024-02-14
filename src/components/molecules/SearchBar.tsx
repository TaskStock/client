import React from "react";
import { Image, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { WithLocalSvg } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";
import SearchDarkIcon from "../../../assets/icons/Search_dark.png";
import SearchIcon from "../../../assets/icons/Search_gray.png";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Icons, { IconsWithoutFeedBack } from "../atoms/Icons";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${spacing.padding}px ${useResponsiveFontSize(12)}px;
  gap: ${spacing.small}px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.box};
`;

export const SearchBar = ({
  onChangeText,
  onPressSearchIcon,
}: {
  onChangeText: (text: string) => void;
  onPressSearchIcon: () => void;
}) => {
  const theme = useTheme();

  const iconColor = theme.text;

  const [text, setText] = React.useState("");

  return (
    <Container>
      <Pressable onPress={onPressSearchIcon}>
        <Icons
          type="materialIcons"
          name="search"
          size={useResponsiveFontSize(36)}
          color={iconColor}
        />
      </Pressable>
      <TextInput
        value={text}
        placeholderTextColor={theme.textDim}
        placeholder="내용이나 날짜를 검색하세요."
        onChangeText={(input) => {
          onChangeText(input);
          setText(input);
        }}
        style={{
          fontSize: useResponsiveFontSize(16),
          flex: 1,
          color: theme.text,
        }}
      ></TextInput>
    </Container>
  );
};

export const SearchBar2 = ({
  text,
  onChangeText,
  onPressSearchIcon,
  placeholder,
}: {
  text: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onPressSearchIcon: () => void;
}) => {
  const theme = useTheme();

  const iconColor = theme.text;

  return (
    <Container>
      <Pressable onPress={onPressSearchIcon}>
        <Icons
          type="materialIcons"
          name="search"
          size={useResponsiveFontSize(36)}
          color={iconColor}
        />
      </Pressable>
      <TextInput
        value={text}
        placeholderTextColor={theme.textDim}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={{
          fontSize: useResponsiveFontSize(16),
          flex: 1,
          color: theme.text,
        }}
      ></TextInput>
    </Container>
  );
};
