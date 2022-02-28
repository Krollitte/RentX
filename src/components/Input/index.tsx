import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";
import { Container, IconContainer, InputText } from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}
export function Input({ iconName, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <IconContainer>
        <Feather color={theme.colors.text_details} name={iconName} size={24} />
      </IconContainer>
      <InputText {...rest} />
    </Container>
  );
}
