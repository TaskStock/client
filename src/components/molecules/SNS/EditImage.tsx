import React from "react";
import { View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { palette } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Icons from "../../atoms/Icons";
import ProfilePic from "../../atoms/ProfilePic";

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
  const { image } = useAppSelect((state) => state.user.user);
  const { strategy } = useAppSelect((state) => state.auth);
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
            <Icons
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
