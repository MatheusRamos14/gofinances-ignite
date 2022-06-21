import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Title,
    Icon
} from './styles';

interface TransactionTypeProps extends RectButtonProps {
    title: string,
    type: 'positive' | 'negative'
    isActive: boolean
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: TransactionTypeProps) {
    const icon = {
        positive: 'arrow-up-circle',
        negative: 'arrow-down-circle'
    }

    return (
        <Container
            isActive={isActive}
            type={type}
            {...rest}
        >
           <Icon name={icon[type]} type={type} /> 
            <Title>{title}</Title>
        </Container>
    )
}