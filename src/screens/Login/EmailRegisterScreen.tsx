import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native";
import styled from "styled-components/native";
import { useAppDispatch } from "../../store/configureStore.hooks";
import { IUser, registerUser } from "../../store/modules/auth";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmailRegisterScreen = ({ route, navigation }) => {
  const email = route.params.email;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<IUser>({
    email: "",
    userName: "",
    password: "",
    isAgree: 1,
    theme: "gray",
    language: "korean",
  });

  useEffect(() => {
    setUser({
      ...user,
      email: email,
    });
  }, []);

  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    if (user.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // 회원가입 성공
    console.log(user);
    dispatch(registerUser(user));
    navigation.navigate("MainTab", { screen: "Home" });
  };

  return (
    <Container>
      <TextInput
        placeholder="Username"
        value={user.userName}
        onChangeText={(text) => handleChange("userName", text)}
      />
      <TextInput
        placeholder="Password"
        value={user.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </Container>
  );
};

export default EmailRegisterScreen;
