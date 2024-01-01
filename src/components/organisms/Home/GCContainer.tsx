import React, { useContext, useState } from "react";
import { View } from "react-native";
import GCTab from "../../molecules/Home/GCTab";
import CalendarContainer from "./CalendarContainer";
import GraphContainer from "./GraphContainer";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";

const GCContainer = ({ myData }) => {
  const [graphSelected, setGraphSelected] = useState(true);
  const { setContentsHeight } = useContext(ComponentHeightContext);
  return (
    <View
      onLayout={(e) => {
        setContentsHeight(e.nativeEvent.layout.height);
      }}
    >
      <GCTab
        graphSelected={graphSelected}
        setGraphSelected={setGraphSelected}
      />
      {graphSelected ? (
        <GraphContainer myData={myData} />
      ) : (
        <CalendarContainer />
      )}
    </View>
  );
};

export default GCContainer;
