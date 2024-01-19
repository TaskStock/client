import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";

import { useTheme } from "styled-components";
import styled from "styled-components/native";
import EditImage from "../../components/molecules/SNS/EditImage";
import { editUserInfoThunk } from "../../store/modules/user";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { Shadow } from "react-native-shadow-2";
import { palette } from "../../constants/colors";

const SaveBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text size="lg">저장</Text>
  </TouchableOpacity>
);

const InputContainer = styled.View`
  margin: 0 ${spacing.offset}px ${spacing.offset}px;
  padding: ${spacing.padding}px 0;
  border-width: 1px;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${(props) => props.theme.text};
  gap: ${spacing.padding}px;
`;
const Input = styled.TextInput`
  font-size: ${useResponsiveFontSize(18)}px;
  color: ${(props) => props.theme.text};
`;
const TextInputContainer = ({
  value,
  placeholder,
  onChangeText,
  subText,
  subTextColor,
  multiline = false,
}: {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  subText: string;
  subTextColor: string;
  multiline?: boolean;
}) => {
  return (
    <InputContainer>
      <Text size="md" color={subTextColor}>
        {subText}
      </Text>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </InputContainer>
  );
};

const EditProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const myInfo = useAppSelect((state) => state.user.user);
  const [data, setData] = useState({
    user_name: myInfo.user_name,
    introduce: myInfo.introduce,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveText = () => {
    dispatch(editUserInfoThunk(data));
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <PageHeader title="" headerRight={<SaveBtn onPress={handleSaveText} />} />
      <FlexBox direction="column" alignItems="center" gap={spacing.gutter}>
        <EditImage onPress={() => setModalVisible(true)} />
        <FlexBox gap={spacing.offset}>
          <Text size="md">팔로워 {myInfo.follower_count.toString()}</Text>
          <Text size="md">팔로잉 {myInfo.following_count.toString()}</Text>
        </FlexBox>
      </FlexBox>
      <TextInputContainer
        subText="이름"
        value={data.user_name}
        placeholder="이름"
        onChangeText={(text) => handleChange("user_name", text)}
        subTextColor={theme.textDim}
      />
      <TextInputContainer
        subText="한줄소개"
        placeholder="한줄소개를 입력해주세요"
        value={data.introduce}
        onChangeText={(text) => handleChange("introduce", text)}
        subTextColor={theme.textDim}
        multiline={true}
      />
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ModalOverlay
          onPress={(event) =>
            event.target == event.currentTarget && setModalVisible(false)
          }
        >
          <Shadow
            distance={20}
            startColor={palette.shadow}
            offset={[0, 0]}
            style={{ borderRadius: 20 }}
          >
            <ModalContainer>
              <SelectImage>
                <Text size="lg">갤러리에서 선택</Text>
              </SelectImage>
              <SelectImage>
                <Text size="lg">기본 이미지로 변경</Text>
              </SelectImage>
            </ModalContainer>
          </Shadow>
        </ModalOverlay>
      </Modal>
    </View>
  );
};

const ModalOverlay = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.View`
  background-color: ${(props) => props.theme.box};
  border-radius: 20px;
  padding: ${spacing.offset}px 0;
`;
const SelectImage = styled.TouchableOpacity`
  padding: ${spacing.offset}px ${spacing.gutter * 2}px;
`;
export default EditProfileScreen;
