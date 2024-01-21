import React, { useState } from "react";
import Text from "../../atoms/Text";
import ContainerWithSearch from "./ContainerWithSearch";
import { client } from "../../../services/api";
import { useAppSelect } from "../../../store/configureStore.hooks";
import FlexBox from "../../atoms/FlexBox";
import User from "../../../store/modules/user";
import UserBox from "../../molecules/SNS/UserBox";

const SearchAllContainer = () => {
  const [searchText, setSearchText] = useState("");
  const { accessToken } = useAppSelect((state) => state.auth);
  const [searchResult, setSearchResult] = useState([]);

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
    <ContainerWithSearch
      searchText={searchText}
      setSearchText={setSearchText}
      onSubmit={handleSubmit}
    >
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
        <Text size="lg">검색 결과가 없습니다.</Text>
      )}
    </ContainerWithSearch>
  );
};

export default SearchAllContainer;
