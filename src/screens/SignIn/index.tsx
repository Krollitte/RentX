import React, { useState } from "react";
import {
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Header, Title, SubTitle, Form, Footer } from "./styles";
import { PasswordInput } from "../../components/PasswordInput";

export function SignIn() {
  const Theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <Header>
            <Title>Estamos{"\n"}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              autoCorrect={false}
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              autoCorrect={false}
              placeholder="Senha"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
              keyboardType="email-address"
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={() => {}}
              enabled={false}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={Theme.colors.background_secondary}
              light
              onPress={() => {}}
              enabled={false}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
