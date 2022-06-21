import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons"; 
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import React from "react";

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    
    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;

    padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const Category = styled(RectButton)<CategoryProps>`
    width: 100%;

    flex-direction: row;
    align-items: center;

    padding: ${RFValue(15)}px;

    background-color: ${({ theme, isActive }) => isActive ?
        theme.colors.secondary_light : theme.colors.background
    };
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${RFValue(20)}px;

    margin-right: 10px;
`;

export const CategoryTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;