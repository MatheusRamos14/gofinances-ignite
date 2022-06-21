import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
    width: 100%;
`;

export const Error = styled.View`
    width: 100%;

    background-color: ${({ theme }) => theme.colors.attetion_light};
    border-radius: 5px;

    flex-direction: row;
    align-items: center;

    padding: 15px;
    margin-bottom: 8px;
`;

export const ErrorIcon = styled(Feather)`
    color: ${({ theme }) => theme.colors.attetion};
    font-size: ${RFValue(25)}px;

    margin-right: 10px;
`;

export const ErrorText = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;