import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const Theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação dela");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("As senhas não são iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta Criada",
          message: `Agora é só fazer login \ne aproveitar`,
        });
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("Opa", "Não foi possível cadastrar");
      });
  }

  return (
    <KeyboardAvoidingView behavior={"position"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
            />
            <PasswordInput
              iconName="lock"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
              placeholder="Repetir Senha"
            />
          </Form>
          <Button
            title="Cadastrar"
            onPress={handleRegister}
            color={Theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
