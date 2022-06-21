import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
    type: 'positive' | 'negative',
    isActive: boolean
}

export const Container = styled(RectButton)<ContainerProps>`
    ${({ type, isActive }) => isActive && type === 'positive' && css`
        background-color: ${({ theme }) => theme.colors.success_light}; 
    `};

    ${({ type, isActive }) => isActive && type === 'negative' && css`
        background-color: ${({ theme }) => theme.colors.attetion_light}; 
    `};

    width: 48%;

    border-width:${({ isActive }) => isActive ? 0 : 1.5}px;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;

    flex-direction: row;
    justify-content: center;

    padding: 18px 0;
`;

export const Icon = styled(Feather)<ContainerProps>`
    color: ${({ theme, type }) => type === 'positive' ?
        theme.colors.success : theme.colors.attetion
    };

    font-size:  ${RFValue(20)}px;

    margin-right: 14px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.title};

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size:  ${RFValue(14)}px;
`;