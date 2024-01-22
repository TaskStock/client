import React, { useState } from "react";
import ContainerWithSearch from "./ContainerWithSearch";
import Text from "../../atoms/Text";

const SearchFollowingContainer = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <ContainerWithSearch searchText={searchText} setSearchText={setSearchText}>
      <Text size="lg">following 검색</Text>
    </ContainerWithSearch>
  );
};

export default SearchFollowingContainer;
