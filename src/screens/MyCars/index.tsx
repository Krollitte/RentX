import React, { useState, useEffect } from "react";
import { StatusBar, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { useTheme } from "styled-components";
import { Car } from "../../components/Car";
import { BackButton } from "../../components/BackButton";
import { LoadAnimantion } from "../../components/LoadAnimantion";

import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import {
  Container,
  Header,
  SubTitle,
  Title,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}
export function MyCars() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser/?user_id=1");
        setCars(response.data);
      } catch (err) {
        console.error("Não foi possível carregar", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <Title>
          Escolha uma data{"\n"}de início e {"\n"}fim do aluguel{" "}
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimantion />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        style={{ marginHorizontal: 16 }}
                        size={20}
                        color={theme.colors.title}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              );
            }}
          />
        </Content>
      )}
    </Container>
  );
}
