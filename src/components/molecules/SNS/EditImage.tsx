import React from "react";
import { View } from "react-native";
import ProfilePic from "../../atoms/ProfilePic";
import { useAppSelect } from "../../../store/configureStore.hooks";

const EditImage = () => {
  const { image, strategy } = useAppSelect((state) => state.user.user);
  return (
    <View>
      <ProfilePic image={image} strategy={strategy} />
    </View>
  );
};

export default EditImage;
