import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface AmountProps {
    type: 'positive' | 'negative',
}

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};

    width: 100%;
    border-radius: 5px;

    padding: 18px 24px;
    margin-bottom: 16px;
`;

export const CardTitle = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<AmountProps>`
    color: ${({ type, theme }) => type === 'positive' ?
    theme.colors.success : theme.colors.attetion};

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 19px;
`;

export const CategoryInfo = styled.View`
    flex-direction: row;
`;

export const CategoryIcon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(20)}px;

    margin-right: 12px;
`;

export const CategoryTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Date = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;
