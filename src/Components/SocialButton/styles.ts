import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
    width: 100%;
    height: ${RFValue(56)}px;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    flex-direction: row;
    align-items: center;

    margin-bottom: ${RFValue(16)}px;
`;

export const ImageContainer = styled.View`
    width: ${RFValue(56)}px;
    height: 100%;

    border-right-width: 1px;
    border-right-color: #F0F2F5;

    align-items: center;
    justify-content: center;
`;

export const ButtonLabel = styled.Text`
    flex: 1;
    
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    text-align: center;
`;
