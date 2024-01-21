import React, { useState } from "react";
import ContainerWithSearch from "./ContainerWithSearch";
import Text from "../../atoms/Text";

const SearchFollowerContainer = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <ContainerWithSearch searchText={searchText} setSearchText={setSearchText}>
      <Text size="lg">follower 검색</Text>
    </ContainerWithSearch>
  );
};

export default SearchFollowerContainer;
