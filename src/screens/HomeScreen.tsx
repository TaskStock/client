import React, { useEffect } from "react";
import { Modal, TouchableOpacity, View, Pressable } from "react-native";
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
import { checkFirstTime, setTutorial } from "../store/modules/tutorial";
import TutorialBox from "../components/molecules/TutorialBox";
import Toast from "react-native-toast-message";
import Text from "../components/atoms/Text";
import { showErrorToast, showSuccessToast } from "../utils/showToast";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const isAddModalOpen = useAppSelect((state) => state.todo.isAddModalOpen);
  const dispatch = useAppDispatch();

  // push notification
  usePushNotification();

  console.log("HomeScreen");

  // tutorial
  const showTutorialIfFirst = async () => {
    const first = await checkFirstTime();
    if (first) {
      dispatch(setTutorial(true));
    }
  };

  useEffect(() => {
    dispatch(getUserInfoThunk());
    showTutorialIfFirst();
  }, []);

  useFlushSavedValues();

  const { showTutorial, step5 } = useAppSelect((state) => state.tutorial);

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
      {showTutorial && step5 ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(setTutorial(false));
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "110%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TutorialBox type={5} />
        </TouchableOpacity>
      ) : null}
    </Container>
  );
};

export default HomeScreen;
