import React from "react";
import styled from "styled-components/native";
import { useAppSelect } from "../../../store/configureStore.hooks";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import ProfilePic from "../../atoms/ProfilePic";
import { spacing } from "../../../constants/spacing";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import { useTheme } from "styled-components";

const Container = styled.TouchableOpacity``;

const Pencil = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
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
      <Pencil>
        <IconsWithoutFeedBack
          type="material"
          name="pencil"
          size={spacing.offset}
          color={theme.text}
        />
      </Pencil>
    </Container>
  );
};

export default EditImage;
