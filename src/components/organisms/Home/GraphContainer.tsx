import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import { spacing } from "../../../constants/spacing";
import MyInfo from "../../molecules/Home/MyInfo";

const GraphContainer = ({ myData }) => {
  const { setMyInfoHeight, setGraphHeight } = useContext(
    ComponentHeightContext
  );
  return (
    <View
      style={{ paddingHorizontal: spacing.gutter, paddingTop: spacing.offset }}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setMyInfoHeight(height);
      }}
    >
      <MyInfo data={myData} />
    </View>
  );
};

export default GraphContainer;
