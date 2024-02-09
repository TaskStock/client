import React, { useEffect } from "react";
import { Modal, Pressable } from "react-native";
import styled from "styled-components/native";
import HeaderTop from "../components/molecules/Home/HeaderTop";
import TodoContainer from "../components/molecules/Home/TodoContainer";
import GCContainer from "../components/organisms/Home/GCContainer";
import AddTodoModal from "../components/organisms/TodoModal/AddTodoModal";
import { useFlushSavedValues } from "../hooks/useFlushSavedValues";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { getUserInfoThunk } from "../utils/UserUtils/getUserInfoThunk";
import usePushNotification from "../hooks/usePushNotification";
import { checkAndRenewTokens } from "../utils/authUtils/tokenUtils";
import Toast from "react-native-toast-message";
import Text from "../components/atoms/Text";
import { showErrorToast, showSuccessToast } from "../utils/showToast";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const isAddModalOpen = useAppSelect((state) => state.todo.isAddModalOpen);

  // push notification
  usePushNotification();

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
