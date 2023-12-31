import React, { useContext, useState } from "react";
import { Dimensions, Modal } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { data } from "../../public/home";
import HeaderTop from "../components/molecules/Home/HeaderTop";
import AddTodoModal from "../components/organisms/TodoModal/AddTodoModal";
import GCContainer from "../components/organisms/Home/GCContainer";
import { useAppSelect } from "../store/configureStore.hooks";
import { ComponentHeightContext } from "../utils/ComponentHeightContext";
import TodoContainer from "../components/molecules/Home/TodoContainer";

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
  const dispatch = useDispatch();

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
