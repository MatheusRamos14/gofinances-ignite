import React from 'react';

import {
    Container,
    Title,
    AmountBox,
    AmountCurrency,
    Amount,
} from './styles';

interface CategoryCardProps {
    title: string,
    amount: number,
    color: string
}

export function CategoryCard({ title, amount, color }: CategoryCardProps) {
    return (
        <Container color={color}>
            <Title>{title}</Title>

            <AmountBox>
                <AmountCurrency>R$</AmountCurrency>
                <Amount>{amount}</Amount>
            </AmountBox>
        </Container>
    );
}