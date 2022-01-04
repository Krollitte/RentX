import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car, CarData } from "../../components/Car";

import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

export function Home() {
  const carData: CarData = {
    brand: "audi",
    name: "RS 5 Coupé",
    rent: { period: "ao dia", price: 120 },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <TotalCars> Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => {
          return <Car data={carData} />;
        }}
      />
    </Container>
  );
}
