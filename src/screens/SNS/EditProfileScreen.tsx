import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import ProfilePic from "../../components/atoms/ProfilePic";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import PageHeader from "../../components/molecules/PageHeader";
import Text from "../../components/atoms/Text";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import TextInput from "../../components/atoms/TextInput";
import { editUserInfoThunk } from "../../store/modules/user";
import EditImage from "../../components/molecules/SNS/EditImage";

const SaveBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text size="lg">저장</Text>
  </TouchableOpacity>
);

const EditProfileScreen = ({ navigation }) => {
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
    <View>
      <PageHeader title="" headerRight={<SaveBtn onPress={handleSaveText} />} />
      <FlexBox direction="column" alignItems="center" gap={spacing.gutter}>
        <EditImage />
        <FlexBox gap={spacing.offset}>
          <Text size="md">팔로워 {myInfo.follower_count.toString()}</Text>
          <Text size="md">팔로잉 {myInfo.following_count.toString()}</Text>
        </FlexBox>
      </FlexBox>
      <TextInput
        subText="이름"
        placeholder="이름"
        value={data.user_name}
        onChangeText={(text) => handleChange("user_name", text)}
        alert={false}
        alertText={"이름을 입력해주세요"}
      />
      <TextInput
        subText="한줄소개"
        placeholder="한줄소개를 입력해주세요"
        value={data.introduce}
        onChangeText={(text) => handleChange("introduce", text)}
        alert={false}
        alertText={"한줄소개를 입력해주세요"}
      />
    </View>
  );
};

export default EditProfileScreen;
