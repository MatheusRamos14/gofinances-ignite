import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { DataProps } from '.';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: ${RFPercentage(42)}px;

    padding-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserWrapper = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0 24px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;

`;
export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;

`;

export const UserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

`;

export const Username = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    width: 100%;
    
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    width: 100%;

    padding: 84px 24px 0;
`;

export const TransactionsTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    margin-bottom: 16px;
`;

export const TransactionsList = styled(
    FlatList as new (props: FlatListProps<DataProps>) => FlatList<DataProps>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace(),
    },
})``;