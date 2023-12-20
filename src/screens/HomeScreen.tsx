import React, { useContext, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { data } from "../../public/home";
import BottomDrawerContainer from "../components/molecules/Home/BottomDrawerContainer";
import HandleTodoBtnContainer from "../components/molecules/Home/HandleTodoBtnContainer";
import MyInfo from "../components/molecules/Home/MyInfo";
import { spacing } from "../constants/spacing";
import { ComponentHeightContext } from "../utils/ComponentHeightContext";

const { width, height: windowHeight } = Dimensions.get("window");

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
  height: ${Math.round((300 * windowHeight) / 932)}px;
  background-color: ${({ theme }) => theme.box};
  border-radius: 20px;
`;

const CalendarContainer = styled(GraphContainer)`
  margin-right: ${spacing.gutter}px;
  margin-left: 0;
`;

const HomeScreen = () => {
  const [myData, setMyData] = useState(data);
  const { setMyInfoHeight, setGraphHeight } = useContext(
    ComponentHeightContext
  );

  const [editEnabled, setEditEnabled] = useState(false);
  const handleEdit = {
    editEnabled,
    setEditEnabled,
  };

  return (
    <Container>
      <View
        style={{ paddingHorizontal: spacing.gutter }}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setMyInfoHeight(height);
        }}
      >
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
        <GraphContainer
          style={boxShadow}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setGraphHeight(height);
          }}
        />
        <CalendarContainer style={boxShadow} />
      </ScrollView>
      <BottomDrawerContainer {...handleEdit} />
      <HandleTodoBtnContainer {...handleEdit} />
    </Container>
  );
};

export default HomeScreen;

const boxShadow = {
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 1,
  shadowRadius: 15,
  elevation: 0,
};
