import React from 'react';

import {
    Container,
    Header,
    CardTitle,
    Icon,
    Footer,
    Amount,
    LastTransaction,
} from './styles';

interface HighlightCardProps {
    title: string,
    amount: string,
    lastTransaction: string,
    type: 'up' | 'down' | 'total'
}

export function HighlightCard({ title, amount, lastTransaction, type }: HighlightCardProps) {
    const icon = {
        up: 'arrow-up-circle',
        down: 'arrow-down-circle',
        total: 'dollar-sign'
    }
   
    return (
        <Container type={type}>
            <Header>
                <CardTitle type={type}>{title}</CardTitle>
                <Icon name={icon[type]} type={type} />
            </Header>

            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    );
}