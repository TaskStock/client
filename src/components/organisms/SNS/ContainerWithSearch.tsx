import { View, Text } from "react-native";
import React from "react";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import styled from "styled-components/native";
import { IconsWithoutFeedBack } from "../../atoms/Icons";

const Container = styled.View`
  flex: 1;
  padding: ${spacing.offset}px;
`;

const InputContainer = styled.View`
  background-color: ${({ theme }) => theme.box};
  border-radius: ${spacing.padding}px;
  padding: ${spacing.padding}px ${useResponsiveFontSize(12)}px;
  width: 100%;
  gap: ${spacing.padding}px;
  align-items: center;
  flex-direction: row;
`;

const Input = styled.TextInput`
  font-size: ${useResponsiveFontSize(18)}px;
  color: ${({ theme }) => theme.text};
  flex: 1;
`;
const TextInputContainer = ({
  value,
  placeholder,
  onChangeText,
}: {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <InputContainer>
      <IconsWithoutFeedBack
        type="materialIcons"
        name="search"
        size={useResponsiveFontSize(36)}
      />
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </InputContainer>
  );
};

const ContainerWithSearch = ({ searchText, setSearchText, children }) => {
  return (
    <Container>
      <TextInputContainer
        value={searchText}
        placeholder="검색"
        onChangeText={(text) => setSearchText(text)}
      />
      {children}
    </Container>
  );
};

export default ContainerWithSearch;
