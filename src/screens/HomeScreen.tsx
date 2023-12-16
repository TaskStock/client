import React, { useState } from "react";
import { data } from "../../public/home";
import styled from "styled-components/native";
import { spacing } from "../constants/spacing";
import { grayTheme } from "../constants/colors";
import MyInfo from "../components/molecules/Home/MyInfo";

const Container = styled.View`
  padding: ${spacing.offset}px ${spacing.gutter}px;
  background-color: ${grayTheme.background};
  flex: 1;
`;

const HomeScreen = () => {
  const [myData, setMyData] = useState(data);

  return (
    <Container>
      <MyInfo data={myData} />
    </Container>
  );
};

export default HomeScreen;
