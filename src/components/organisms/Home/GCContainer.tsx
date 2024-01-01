import React, { useState } from "react";
import { View } from "react-native";
import GraphContainer from "./GraphContainer";
import GCTab from "../../molecules/Home/GCTab";
import CalendarContainer from "./CalendarContainer";
import { spacing } from "../../../constants/spacing";

const GCContainer = ({ myData }) => {
  const [graphSelected, setGraphSelected] = useState(true);
  return (
    <View>
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
