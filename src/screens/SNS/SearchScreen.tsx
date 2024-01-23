import React, { useState } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { IconsWithoutFeedBack } from "../../components/atoms/Icons";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import UserBox from "../../components/molecules/SNS/UserBox";
import { spacing } from "../../constants/spacing";
import { client } from "../../services/api";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { View } from "react-native";
import FlexBox from "../../components/atoms/FlexBox";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ResultContainer = styled.View`
  padding: ${spacing.padding}px ${spacing.offset}px;
  flex: 1;
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
  onSubmit,
}: {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}) => {
  const theme = useTheme();
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
        placeholderTextColor={theme.textDim}
        returnKeyType="search"
        onSubmitEditing={() => onSubmit()}
      />
    </InputContainer>
  );
};

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const { accessToken } = useAppSelect((state) => state.auth);
  const [searchResult, setSearchResult] = useState([]);
  const theme = useTheme();

  const handleSubmit = async () => {
    console.log(searchText);
    console.log(accessToken);
    if (searchText === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    try {
      const response = await client.get(
        `sns/users/search/?searchScope=global&searchTarget=${searchText}`,
        { accessToken }
      );
      console.log(response);
      if (response.result === "success") {
        setSearchResult(response.searchResult);
      }
    } catch (e) {
      console.log("검색 실패: ", e);
    }
  };
  return (
    <Container>
      <PageHeader title="검색" />
      <ResultContainer>
        <TextInputContainer
          value={searchText}
          placeholder="유저의 닉네임이나 이메일을 검색하세요."
          onChangeText={(text) => setSearchText(text)}
          onSubmit={handleSubmit}
        />
        {searchResult.length > 0 ? (
          searchResult.map(
            (user: {
              user_id: number;
              user_name: string;
              image: string;
              cumulative_value: number;
              strategy: string;
            }) => (
              <UserBox
                key={user.user_id.toString()}
                username={user.user_name}
                value={user.cumulative_value}
                image={user.image}
                userId={user.user_id}
                strategy={user.strategy}
                rank={1}
              />
            )
          )
        ) : (
          <FlexBox
            justifyContent="center"
            alignItems="center"
            styles={{ flex: 1 }}
          >
            <Text size="md" color={theme.textDim}>
              검색 결과가 없습니다.
            </Text>
          </FlexBox>
        )}
      </ResultContainer>
    </Container>
  );
};

export default SearchScreen;
