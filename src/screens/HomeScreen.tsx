import React, { useState } from "react";
import { data } from "../../public/home";
import styled from "styled-components/native";
import { spacing } from "../constants/spacing";
import { grayTheme } from "../constants/colors";
import MyInfo from "../components/molecules/Home/MyInfo";
import { Dimensions, ScrollView, View } from "react-native";
import CandleStickChart from "../components/organisms/CandleStickChart";

const { width } = Dimensions.get("window");

const Container = styled.View`
  padding-top: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;
const GraphContainer = styled.View`
  width: ${width - 60}px;
  margin: ${spacing.offset}px 0;
  margin-left: ${spacing.gutter}px;
  margin-right: 15px;
  height: 320px;
  background-color: ${({ theme }) => theme.box};
  border-radius: 20px;
`;
const CalendarContainer = styled(GraphContainer)`
  margin-right: ${spacing.gutter}px;
  margin-left: 0;
`;
const HomeScreen = () => {
  const [myData, setMyData] = useState(data);

  return (
    <Container>
      <View style={{ paddingHorizontal: spacing.gutter }}>
        <MyInfo data={myData} />
      </View>
      <ScrollView
        style={{}}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width - 60}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <GraphContainer>
          <CandleStickChart />
        </GraphContainer>
        <CalendarContainer />
      </ScrollView>

      <View style={{ flex: 1 }}></View>
    </Container>
  );
};

export default HomeScreen;
