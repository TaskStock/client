import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Modal } from "react-native";
import styled from "styled-components/native";

const ModalOverlay = styled.Pressable`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ZoomPicModal = ({ picZoomModal, setPicZoomModal, children }) => {
  const { width: clientWidth } = Dimensions.get("window");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (picZoomModal) {
      // 모달을 보여줄 때
      Animated.timing(fadeAnim, {
        toValue: 1, // 최종값은 1 (불투명)
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      // 모달을 숨길 때
      Animated.timing(fadeAnim, {
        toValue: 0, // 다시 0으로
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [picZoomModal, fadeAnim]);

  return (
    <Modal
      transparent
      visible={picZoomModal}
      onRequestClose={() => setPicZoomModal(false)}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: fadeAnim,
        }}
      >
        <ModalOverlay onPress={() => setPicZoomModal(false)}>
          {children}
        </ModalOverlay>
      </Animated.View>
    </Modal>
  );
};

export default ZoomPicModal;
