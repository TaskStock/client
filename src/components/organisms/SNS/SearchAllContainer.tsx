import React, { useState } from "react";
import Text from "../../atoms/Text";
import ContainerWithSearch from "./ContainerWithSearch";

const SearchAllContainer = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <ContainerWithSearch searchText={searchText} setSearchText={setSearchText}>
      <Text size="lg">전체 검색</Text>
    </ContainerWithSearch>
  );
};

export default SearchAllContainer;
