import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { data } from "../../public/home";
import HeaderTop from "../components/molecules/Home/HeaderTop";
import TodoContainer from "../components/molecules/Home/TodoContainer";
import GCContainer from "../components/organisms/Home/GCContainer";
import AddTodoModal from "../components/organisms/TodoModal/AddTodoModal";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { getUserInfoThunk } from "../store/modules/user";
import { ComponentHeightContext } from "../utils/ComponentHeightContext";
import { useGetValuesArg } from "../hooks/useGetValuesArg";
import { chartApi } from "../store/modules/chart";
import { checkIsWithInCurrentCalcDay } from "../utils/checkIsSameLocalDay";
import { resetSaveValueUpdate } from "../store/modules/home";
import { useFlushSavedValues } from "../hooks/useFlushSavedValues";
import { useFocusEffect } from "@react-navigation/native";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const isAddModalOpen = useAppSelect((state) => state.todo.isAddModalOpen);
  const dispatch = useAppDispatch();

  const { DEFAULT_HEIGHT, OPEN_STATE } = useContext(ComponentHeightContext);

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, []);

  useFlushSavedValues();

  return (
    <Container>
      <HeaderTop navigation={navigation} />
      <GCContainer />
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
