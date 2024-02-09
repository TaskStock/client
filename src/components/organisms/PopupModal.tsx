import React, { useState } from "react";
import { Modal, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";
import { IconsWithoutFeedBack } from "../atoms/Icons";
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
const Children = styled.View`
  width: 90%;
  height: 250px;
  background-color: ${({ theme }) => theme.box};
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
          <Children>
            <Upper>
              <IconsWithoutFeedBack
                type="ionicons"
                name="checkmark-circle-outline"
                size={80}
                color={theme.textDim}
              />
              <Text size="md">{text}</Text>
            </Upper>
            <Bottom onPress={() => handleClose()}>
              <Text size="md">확인</Text>
            </Bottom>
          </Children>
        </Overlay>
      </Modal>
    </View>
  );
};

export default PopupModal;
