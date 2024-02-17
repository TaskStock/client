import { useRefresh } from "@react-native-community/hooks";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import FlexBox from "../../components/atoms/FlexBox";
import Icons from "../../components/atoms/Icons";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import UserBox from "../../components/molecules/SNS/UserBox";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { searchThunk } from "../../store/modules/getFriends";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

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
      <Icons
        type="materialIcons"
        name="search"
        color={theme.text}
        size={useResponsiveFontSize(36)}
      />
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={theme.textDim}
        returnKeyType="search"
        onSubmitEditing={() => onSubmit()}
        autoCorrect={false}
        autoCapitalize="none" // iOS only
        autoComplete="off" // Android only
      />
    </InputContainer>
  );
};

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const { accessToken } = useAppSelect((state) => state.auth);
  const { searchList } = useAppSelect((state) => state.friends);
  let data;

  const { isRefreshing, onRefresh } = useRefresh(() =>
    dispatch(searchThunk(searchText))
  );
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    console.log(searchText);
    console.log(accessToken);
    if (searchText === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    dispatch(searchThunk(searchText));
  };
  useEffect(() => {
    dispatch(searchThunk(searchText));
  }, []);
  useEffect(() => {
    if (searchText === "") {
      dispatch(searchThunk(searchText));
    }
  }, [searchText]);

  const NoData = (
    <FlexBox
      justifyContent="center"
      alignItems="center"
      styles={{ flex: 1, height: 300 }}
    >
      <Text size="md" color={theme.textDim}>
        검색 결과가 없습니다.
      </Text>
    </FlexBox>
  );

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
        <FlatList
          data={searchList}
          renderItem={({ item }) => (
            <UserBox
              username={item.user_name}
              value={item.cumulative_value}
              image={item.image}
              userId={item.user_id}
              strategy={item.strategy}
              isPrivate={item.private}
              isPending={item.pending}
              isFollowingMe={item.isFollowingMe}
              isFollowingYou={item.isFollowingYou}
              button={item.button}
            />
          )}
          style={{ flex: 1 }}
          ListEmptyComponent={NoData}
          keyExtractor={(item) => item.user_id.toString()}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      </ResultContainer>
    </Container>
  );
};

export default SearchScreen;
