import React from "react";
import { Modal, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Icons from "../atoms/Icons";
import Text from "../atoms/Text";

const Overlay = styled.View`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const BackgroundPressable = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Children = styled.View<{ reduxTheme: string }>`
  width: 90%;
  height: 250px;
  background-color: ${({ theme }) => theme.box};
  border: 1px solid
    ${({ theme, reduxTheme }) =>
      reduxTheme === "dark" ? theme.textDim : "transparent"};

  border-radius: 20px;
  overflow: hidden;
`;

const Upper = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${spacing.gutter}px;
  flex: 1;
  gap: ${spacing.padding}px;
`;
const Bottom = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${spacing.offset}px ${spacing.gutter}px;
  background-color: ${({ theme }) => theme.background};
`;

const PopupModal = ({
  text,
  modalVisible,
  setModalVisible,
  onPress,
}: {
  text: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onPress?: () => void;
}) => {
  const theme = useTheme();
  const reduxTheme = useAppSelect((state) => state.theme.value);
  const handleClose = () => {
    setModalVisible(false);
    onPress && onPress();
  };
  return (
    <View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        animationType="fade"
      >
        <Overlay>
          <BackgroundPressable onPress={() => handleClose()} />
          <Children reduxTheme={reduxTheme}>
            <Upper>
              <Icons
                type="ionicons"
                name="checkmark-circle-outline"
                size={useResponsiveFontSize(100)}
                color={reduxTheme === "gray" ? theme.textDim : theme.text}
              />
              <Text size="md">{text}</Text>
            </Upper>
            <Bottom onPress={() => handleClose()}>
              <Text size="lg">확인</Text>
            </Bottom>
          </Children>
        </Overlay>
      </Modal>
    </View>
  );
};

export default PopupModal;
