import React from "react";
import { Button, StyleSheet, Dimensions } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const WIDTH = Dimensions.get("window").width;

import { Container } from "./styles";

export function Splash() {
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 3000,
            easing: Easing.bezier(0.01, 1.07, 1, -0.28),
          }),
        },
      ],
    };
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
      <Animated.View style={[style.box, animatedStyles]} />
      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
}

export const style = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    backgroundColor: "red",
  },
});
