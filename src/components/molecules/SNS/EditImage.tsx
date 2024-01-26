import React from "react";
import styled from "styled-components/native";
import { useAppSelect } from "../../../store/configureStore.hooks";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import ProfilePic from "../../atoms/ProfilePic";
import { spacing } from "../../../constants/spacing";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import { useTheme } from "styled-components";
import { Shadow } from "react-native-shadow-2";
import { palette } from "../../../constants/colors";
import { View } from "react-native";

const Container = styled.TouchableOpacity``;

const Pencil = styled.View`
  background-color: ${({ theme }) => theme.box};
  width: ${spacing.gutter}px;
  height: ${spacing.gutter}px;
  border-radius: ${spacing.gutter}px;
  justify-content: center;
  align-items: center;
`;
const EditImage = ({ onPress }) => {
  const { image, strategy } = useAppSelect((state) => state.user.user);
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <ProfilePic
        image={image}
        strategy={strategy}
        size={useResponsiveFontSize(100)}
      />
      <View style={{ position: "absolute", right: 0, bottom: 0 }}>
        <Shadow
          distance={5}
          startColor={palette.shadow}
          offset={[0, 0]}
          style={{
            borderRadius: spacing.gutter,
          }}
        >
          <Pencil>
            <IconsWithoutFeedBack
              type="material"
              name="pencil"
              size={spacing.offset}
              color={theme.text}
            />
          </Pencil>
        </Shadow>
      </View>
    </Container>
  );
};

export default EditImage;
