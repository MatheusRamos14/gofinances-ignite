import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
    color: string;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    border-left-width: 4px;
    border-left-color: ${({ color }) => color};

    flex-direction: row;
    justify-content: space-between;

    padding: 13px 20px;
    margin-bottom: 8px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.title};

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;

`;

export const AmountBox = styled.View`
    flex-direction: row;
`;

export const AmountCurrency = styled.Text`
    color: ${({ theme }) => theme.colors.title};

    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
    color: ${({ theme }) => theme.colors.title};

    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;
