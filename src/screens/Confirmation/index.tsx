import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { ConfirmButton } from "../../components/ConfirmButton";

import { Container, Content, Title, Message, Footer } from "./styles";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleHome() {
    navigation.navigate(nextScreenRoute);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton onPress={handleHome} title="Ok" />
      </Footer>
    </Container>
  );
}
