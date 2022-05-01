import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
    type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeProps>`
    width: ${RFValue(300)}px;
    
    border-radius: 5px;
    
    background-color: ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};

    padding: ${RFValue(19)}px ${RFValue(23)}px;
    padding-bottom: ${RFValue(42)}px;

    margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
`;

export const CardTitle = styled.Text<TypeProps>`
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
    

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;

    ${({ type }) => type === 'up' && css`
        color: ${({ theme }) => theme.colors.success}
    `};
    ${({ type }) => type === 'down' && css`
        color: ${({ theme }) => theme.colors.attetion}
    `};
    ${({ type }) => type === 'total' && css`
        color: ${({ theme }) => theme.colors.shape}
    `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};

    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    margin-top: ${RFValue(38)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
`;