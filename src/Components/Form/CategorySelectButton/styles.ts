import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 17px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text};

    font-size: ${RFValue(20)}px;
`;
