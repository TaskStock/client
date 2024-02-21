import React, { useEffect } from "react";
import { BackHandler, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import HeaderTop from "../components/molecules/Home/HeaderTop";
import TodoContainer from "../components/molecules/Home/TodoContainer";
import TutorialBox from "../components/molecules/TutorialBox";
import GCContainer from "../components/organisms/Home/GCContainer";
import AddTodoModal from "../components/organisms/TodoModal/AddTodoModal";
import { useFlushSavedValues } from "../hooks/useFlushSavedValues";
import usePushNotification from "../hooks/usePushNotification";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { checkFirstTime, setTutorial } from "../store/modules/tutorial";
import { getUserInfoThunk } from "../utils/UserUtils/getUserInfoThunk";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const isAddModalOpen = useAppSelect((state) => state.todo.isAddModalOpen);
  const dispatch = useAppDispatch();

  // 뒤로가기 막기 AOS
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        // true를 반환하여 뒤로 가기(기본동작) 막기
        return true;
      }
    );

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => backHandler.remove();
  }, []);

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

  usePushNotification();

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
