import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    background-color: ${({ theme }) =>  theme.colors.secondary};

    width: 100%;
    border-radius: 5px;

    align-items: center;
    justify-content: center;

    padding: 17px 0;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;