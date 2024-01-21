import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { data } from "../../public/home";
import HeaderTop from "../components/molecules/Home/HeaderTop";
import TodoContainer from "../components/molecules/Home/TodoContainer";
import GCContainer from "../components/organisms/Home/GCContainer";
import AddTodoModal from "../components/organisms/TodoModal/AddTodoModal";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { ComponentHeightContext } from "../utils/ComponentHeightContext";
import { useGetValuesArg } from "../hooks/useGetValuesArg";
import { chartApi } from "../store/modules/chart";
import { checkIsWithInCurrentCalcDay } from "../utils/checkIsSameLocalDay";
import { resetSaveValueUpdate } from "../store/modules/home";
import { getUserInfoThunk } from "../utils/UserUtils/getUserInfoThunk";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const [myData, setMyData] = useState(data);
  const { setContentsHeight, setHeaderHeight } = useContext(
    ComponentHeightContext
  );

  const isAddModalOpen = useAppSelect((state) => state.todo.isAddModalOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, []);

  const isHomeDrawerOpen = useAppSelect((state) => state.home.isDrawerOpen);
  const { startDate, endDate } = useGetValuesArg();
  const savedValueUpdate = useAppSelect((state) => state.home.savedValueUpdate);

  useEffect(() => {
    console.log("todo container", isHomeDrawerOpen);

    if (!isHomeDrawerOpen) {
      console.log("flush savedValueUpdate");

      dispatch(
        chartApi.util.updateQueryData(
          "getValues",
          {
            startDate,
            endDate,
          },
          ({ values }) => {
            if (values.length == 0) return;

            const index = values.findIndex((value) =>
              checkIsWithInCurrentCalcDay(value.date)
            );

            if (index == -1) return;

            const targetValue = values[index];

            targetValue.high += savedValueUpdate.dhigh;
            targetValue.low += savedValueUpdate.dlow;
            targetValue.start += savedValueUpdate.dstart;
            targetValue.end += savedValueUpdate.dend;

            dispatch(resetSaveValueUpdate());
          }
        )
      );
    }
  }, [isHomeDrawerOpen]);

  return (
    <Container>
      <HeaderTop navigation={navigation} />
      <GCContainer myData={data} />
      <TodoContainer />
      {/* <HandleTodoBtnContainer {...handleEdit} /> */}
      {isAddModalOpen && (
        <Modal visible={isAddModalOpen} transparent={true}>
          <AddTodoModal></AddTodoModal>
        </Modal>
      )}
    </Container>
  );
};

export default HomeScreen;
