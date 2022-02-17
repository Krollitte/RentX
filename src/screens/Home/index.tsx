import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import Logo from "../../assets/logo.svg";
import { Ionicons } from "@expo/vector-icons";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from "./styles";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      (positionX.value = ctx.positionX + event.translationX),
        (positionY.value = ctx.positionY + event.translationY);
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        console.log("");
        setCars(response.data);
      } catch (error) {
        console.error("error -->", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

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
          <TotalCars> Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return <Car data={item} onPress={() => handleCarDetails(item)} />;
          }}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
