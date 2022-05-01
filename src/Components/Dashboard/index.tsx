import React from 'react';

import { HighlightCard } from '../HighlightCard';
import { TransactionCard, TransactionProps } from '../TransactionCard';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    Username,
    Icon,
    HighlightCards,
    Transactions,
    TransactionsTitle,
    TransactionsList
} from './styles';

export interface DataProps extends TransactionProps {
    id: string,
}

export function Dashboard() {
    const data: DataProps[] = [
        {
            id: '0',
            type: 'positive',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: {
                title: 'Vendas',
                icon: 'dollar-sign',
            },
            date: '13/04/2020'
        },
        {
            id: '1',
            type: 'negative',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            category: {
                title: 'Alimentação',
                icon: 'coffee',
            },
            date: '10/04/2020'
        },
        {
            id: '2',
            type: 'negative',
            title: 'Aluguel do apartamento',
            amount: 'R$ 1.200,00',
            category: {
                title: 'Casa',
                icon: 'shopping-bag',
            },
            date: '13/04/2020'
        }
    ]

    return (
        <Container>

            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/63799573?v=4' }} />

                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <Username>Matheus</Username>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>

            </Header>

            <HighlightCards>
                <HighlightCard
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction='Última entrada dia 13 de abril'
                    type="up"
                />
                <HighlightCard
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction='Última saída dia 03 de abril'
                    type="down"
                />
                <HighlightCard
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction='01 à 16 de abril'
                    type="total"
                />
            </HighlightCards>

            <Transactions>
                <TransactionsTitle>Listagem</TransactionsTitle>

                <TransactionsList
                    data={data}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                    keyExtractor={(item) => item.id}
                />
            </Transactions>

        </Container>
    );
}