import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import HeaderTop from "../components/molecules/Home/HeaderTop";
import TodoContainer from "../components/molecules/Home/TodoContainer";
import GCContainer from "../components/organisms/Home/GCContainer";
import AddTodoModal from "../components/organisms/TodoModal/AddTodoModal";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { ComponentHeightContext } from "../utils/ComponentHeightContext";
import { useFlushSavedValues } from "../hooks/useFlushSavedValues";
import { getUserInfoThunk } from "../utils/UserUtils/getUserInfoThunk";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const isAddModalOpen = useAppSelect((state) => state.todo.isAddModalOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, []);

  useFlushSavedValues();

  return (
    <Container>
      <HeaderTop navigation={navigation} />
      <GCContainer />
      <TodoContainer />
      {isAddModalOpen && (
        <Modal visible={isAddModalOpen} transparent={true}>
          <AddTodoModal></AddTodoModal>
        </Modal>
      )}
    </Container>
  );
};

export default HomeScreen;
