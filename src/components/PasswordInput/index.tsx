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
  value?: string;
}
export function PasswordInput({ iconName, value, ...rest }: Props) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handlesPasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container {...rest}>
      <IconContainer isFocused={isFocused}>
        <Feather
          color={
            isFocused || isFilled
              ? theme.colors.main
              : theme.colors.text_details
          }
          name={iconName}
          size={24}
        />
      </IconContainer>
      <InputText
        isFocused={isFocused}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        {...rest}
        secureTextEntry={!isPasswordVisible}
      />
      <ChangePasswordVisibilityButton onPress={handlesPasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
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
