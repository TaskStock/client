import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import { TextAreaInput } from "../../components/atoms/TextInput";
import PageHeader from "../../components/molecules/PageHeader";
import { spacing } from "../../constants/spacing";
// import { RootState } from "../../store/configureStore";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { Shadow } from "react-native-shadow-2";
import { palette } from "../../constants/colors";
import FlexBox from "../../components/atoms/FlexBox";
import { useClient } from "../../hooks/useClient";
import Toast from "react-native-toast-message";
import { TRootState } from "../../store/configureStore";

const Container = styled.ScrollView`
  padding: ${spacing.offset}px;
`;

const SuccessFullySentBox = styled.View`
  background-color: ${({ theme }) => theme.box};
  border-radius: ${useResponsiveFontSize(5)}px;
  padding: ${spacing.padding}px ${spacing.offset}px;
`;

const Success = ({ visible, message }) => (
  <FlexBox
    justifyContent="center"
    alignItems="flex-end"
    styles={{
      height: useResponsiveFontSize(100),
      paddingBottom: spacing.padding,
      opacity: visible ? 1 : 0,
    }}
  >
    <Shadow
      distance={10}
      startColor={palette.shadow}
      offset={[0, 0]}
      style={{
        borderRadius: useResponsiveFontSize(5),
      }}
    >
      <SuccessFullySentBox>
        <Text size="sm">{message}</Text>
      </SuccessFullySentBox>
    </Shadow>
  </FlexBox>
);

const CustomerServiceScreen = ({ navigation }) => {
  const [content, setContent] = useState("");
  const { accessToken } = useAppSelect((state: TRootState) => state.auth);
  const { email } = useAppSelect((state: TRootState) => state.user.user);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();
  const client = useClient(dispatch);

  const sendToServer = async () => {
    // 내용 비어있으면 보내지 않음
    if (content === "") {
      Toast.show({
        type: "error",
        text1: "내용을 입력해주세요",
        visibilityTime: 2000,
        keyboardOffset: 100,
      });

      return;
    } else {
      try {
        const res = await client.post(
          "notice/setting/suggestion",
          {
            content,
            email,
          },
          { accessToken }
        );
        console.log(res);
        if (res.result === "success") {
          setVisible(true);
          setMessage("성공적으로 전송되었습니다. 감사합니다!");
          setTimeout(() => {
            setVisible(false);
            navigation.goBack();
          }, 3000);
        } else {
          setVisible(true);
          setMessage("서버에서 알 수 없는 오류가 발생했습니다.");
        }
      } catch (e) {
        setVisible(true);
        setMessage("고객의견 보내기 실패");
        console.log("고객의견 보내기 실패. 다시 시도해주세요.", e);
      }
    }
  };

  const onChangeContent = (text) => {
    if (content.length < 1500) {
      setContent(text);
    }
  };

  return (
    <>
      <PageHeader title="고객센터" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Container contentContainerStyle={{ flexGrow: 1 }}>
          <Text size="lg" weight="semibold">
            에러 보고 및 문의 사항
          </Text>
          <Margin margin={spacing.offset} />
          <TextAreaInput
            numberOfLines={50}
            minHeight={useResponsiveFontSize(300)}
            placeholder="내용을 입력해주세요"
            value={content}
            onChangeText={onChangeContent}
          ></TextAreaInput>
          <Success visible={visible} message={message} />
          <BlackBtn text="보내기" onPress={sendToServer} />
          <Margin margin={spacing.gutter} />
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default CustomerServiceScreen;
