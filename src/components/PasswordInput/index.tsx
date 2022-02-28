import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";
import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
} from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}
export function PasswordInput({ iconName, ...rest }: Props) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handlesPasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <Container {...rest}>
      <IconContainer>
        <Feather color={theme.colors.text_details} name={iconName} size={24} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={!isPasswordVisible} />
      <ChangePasswordVisibilityButton onPress={handlesPasswordVisibilityChange}>
        <IconContainer>
          <Feather
            color={theme.colors.text_details}
            name={!isPasswordVisible ? "eye" : "eye-off"}
            size={24}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
