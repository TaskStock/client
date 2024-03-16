import React, { useEffect } from "react";
import { Alert, BackHandler, Modal, TouchableOpacity } from "react-native";
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
import { initializeAdMob } from "../utils/AdMob/initializeAdMob";
import useCustomBackHandler from "../hooks/useCustomBackHander";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const isAddModalOpen = useAppSelect((state) => state.todo.isAddModalOpen);
  const dispatch = useAppDispatch();

  // 뒤로가기 막기 AOS
  const handleBackPress = () => {
    if (navigation.isFocused()) {
      Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        { text: "확인", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    } else {
      return false;
    }
  };

  useCustomBackHandler(handleBackPress);

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
    initializeAdMob();
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
