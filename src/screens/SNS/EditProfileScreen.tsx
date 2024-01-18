import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import ProfilePic from "../../components/atoms/ProfilePic";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import PageHeader from "../../components/molecules/PageHeader";
import Text from "../../components/atoms/Text";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";

import { editUserInfoThunk } from "../../store/modules/user";
import EditImage from "../../components/molecules/SNS/EditImage";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useTheme } from "styled-components";

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
        <EditImage onPress={() => {}} />
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
      />
    </View>
  );
};

export default EditProfileScreen;
