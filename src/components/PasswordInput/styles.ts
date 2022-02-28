import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  margin-right: 2px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  padding: 0 23px;
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)``;
