import React from 'react';

import { categories } from '../../utils/categories';
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

export interface TransactionProps {
    type: 'positive' | 'negative',
    name: string,
    amount: number,
    category: string,
    date: string
}

interface TransctionCardProps {
    data: TransactionProps
}

export function TransactionCard({ data }: TransctionCardProps) {
    const category = categories.filter(item => item.key === data.category)[0];

    return (
        <Container>
            <CardTitle>{data.name}</CardTitle>
            <Amount type={data.type}>
                {data.type === 'negative' ? '- ' : ''}
                {data.amount}
            </Amount>

            <Footer>
                <CategoryInfo>
                    <CategoryIcon name={category.icon} />
                    <CategoryTitle>{category.name}</CategoryTitle>
                </CategoryInfo>

                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}