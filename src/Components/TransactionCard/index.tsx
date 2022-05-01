import React from 'react';

import {
    Container,
    CardTitle,
    Amount,
    Footer,
    CategoryInfo,
    CategoryIcon,
    CategoryTitle,
    Date,
} from './styles';

interface Category {
    title: string,
    icon: string,
}

export interface TransactionProps {
    type: 'positive' | 'negative',
    title: string,
    amount: string,
    category: Category,
    date: string
}

interface TransctionCardProps {
    data: TransactionProps
}

export function TransactionCard({ data }: TransctionCardProps) {
    return (
        <Container>
            <CardTitle>{data.title}</CardTitle>
            <Amount type={data.type}>
                {data.type === 'negative' ? '- ' : ''}
                {data.amount}
            </Amount>

            <Footer>
                <CategoryInfo>
                    <CategoryIcon name={data.category.icon} />
                    <CategoryTitle>{data.category.title}</CategoryTitle>
                </CategoryInfo>

                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}