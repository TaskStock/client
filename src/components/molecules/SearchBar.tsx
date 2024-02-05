import styled, { useTheme } from "styled-components/native";
import Icons from "../atoms/Icons";
import { TextInput } from "react-native-gesture-handler";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { WithLocalSvg } from "react-native-svg";
import SearchIcon from "../../../assets/icons/search.svg";
import { spacing } from "../../constants/spacing";
import { Pressable } from "react-native";
import React from "react";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 7px 13px;
  gap: ${spacing.small}px;
  border-radius: 10px;
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

  const [text, setText] = React.useState("");

  return (
    <Container>
      <Pressable onPress={onPressSearchIcon}>
        <WithLocalSvg asset={SearchIcon} width={34} height={34} />
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

  return (
    <Container>
      <Pressable onPress={onPressSearchIcon}>
        <WithLocalSvg
          asset={SearchIcon}
          width={34}
          height={34}
          fill={theme.text}
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
        }}
      ></TextInput>
    </Container>
  );
};
