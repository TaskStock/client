import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import PageHeader from "../../components/molecules/PageHeader";
import PopupModal from "../../components/organisms/PopupModal";
import { spacing } from "../../constants/spacing";
import { client } from "../../services/api";
import { checkValidPassword } from "../../utils/checkValidity";

const Container = styled.View`
  background-color: ${({ theme }) => theme.box};
  flex: 1;
`;

const FindPwSetNewPwScreen = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwalert, setPwAlert] = useState("");
  const [confirmAlert, setConfirmAlert] = useState("");
  const { email, type } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePwChange = (text) => {
    setPassword(text);
    setPwAlert("");
  };
  const handleConfirmPwChange = (text) => {
    setConfirmPassword(text);
    setConfirmAlert("");
  };

  const handleSetNewPw = async () => {
    console.log(checkValidPassword(password));
    if (checkValidPassword(password)) {
      if (password === confirmPassword) {
        const response = await client.post("account/change/password", {
          email: email,
          password: password,
        });
        console.log(response);
        if (response.result === "success") {
          setModalVisible(true);
        } else {
          alert("비밀번호 변경에 실패했습니다.");
        }
      } else {
        setConfirmAlert("비밀번호가 일치하지 않습니다. (숫자 포함 8자 이상)");
      }
    } else {
      setPwAlert("해당 비밀번호를 사용할 수 없습니다. (숫자 포함 8자 이상)");
    }
  };

  return (
    <Container>
      <PopupModal
        text="비밀번호가 정상적으로 변경되었습니다."
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={() => {
          if (type === "login") {
            navigation.navigate("EmailLogin");
          } else if (type === "settings") {
            navigation.popToTop();
          }
        }}
      />
      {type === "settings" && <PageHeader title="" />}
      <LoginContainer comment="새 비밀번호를 입력해주세요.">
        <TextInput
          subText={"비밀번호"}
          placeholder="새로운 비밀번호를 입력해주세요"
          value={password}
          onChangeText={handlePwChange}
          secureTextEntry
          alert={!!pwalert}
          alertText={pwalert}
        />
        <TextInput
          subText={"비밀번호 확인"}
          placeholder="새로운 비밀번호를 다시 입력해주세요"
          value={confirmPassword}
          onChangeText={handleConfirmPwChange}
          secureTextEntry
          alert={!!confirmAlert}
          alertText={confirmAlert}
        />
        <BlackBtn
          text={"확인"}
          onPress={handleSetNewPw}
          style={{ marginTop: spacing.padding }}
          // loading={loading}
        />
      </LoginContainer>
    </Container>
  );
};

export default FindPwSetNewPwScreen;
