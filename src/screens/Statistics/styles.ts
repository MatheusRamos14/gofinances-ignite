import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    
    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;

    padding-bottom: ${RFValue(19)}px;
`;

export const HeaderTitle = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView`
    flex: 1;
`;

export const ChartContainer = styled.View`
    width: 100%;

    align-items: center; 
`;

export const MonthSelector = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)`
`;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
    flex: 1;

    align-items: center;
    justify-content: center;
`;

export const LoadIndicator = styled.ActivityIndicator.attrs({
    size: 'large'
})``;
