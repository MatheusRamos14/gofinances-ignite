import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { useAuth } from '../../hooks/auth';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionProps } from '../../Components/TransactionCard';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    Username,
    Borderless,
    Icon,
    HighlightCards,
    Transactions,
    TransactionsTitle,
    TransactionsList,
    EmptyContainer,
    EmptyTitle,
    EmptyText,
    EmptyButton,
    LoadContainer,
    LoadingIndicator,
} from './styles';

export interface DataProps extends TransactionProps {
    id: string,
}

interface HighLightDataProps {
    amount: string,
    lastTransaction: string | false
}

interface HighlightCardProps {
    entries: HighLightDataProps,
    expensies: HighLightDataProps,
    total: HighLightDataProps
}

interface DashboardProps {
    navigation: {
        navigate: (screen: string) => void
    }
}

export function Dashboard({ navigation }: DashboardProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [transactions, setTransactions] = useState<DataProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightCardProps>({} as HighlightCardProps)

    const theme = useTheme()
    const { user, signOut } = useAuth();

    function transactionsPeriod(transactions: DataProps[], type: 'positive' | 'negative' | 'total') {
        if (type === 'total') {
            const filter = transactions.map(transaction => new Date(transaction.date).getTime())

            if (filter.length === 0) return false
            else {
                const firstTransaction = new Date(Math.min.apply(Math, filter));
                const lastTransaction = new Date(Math.max.apply(Math, filter));

                const firstDateFormatted = `${firstTransaction.getDate()} de ${Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(firstTransaction)}`
                const lastDateFormatted = `${lastTransaction.getDate()} de ${Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(lastTransaction)}`

                return `${firstDateFormatted} à ${lastDateFormatted}`
            }

        } else {
            const filter = transactions.filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())

            if (filter.length === 0) return false
            else {
                const lastTransaction = new Date(Math.max.apply(Math, filter))

                return `${lastTransaction.getDate()} de ${Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(lastTransaction)}`
            }
        }
    }

    async function loadData() {
        setIsLoading(true)
        const asyncData = await AsyncStorage.getItem(`@gofinances:transactions:user=${user.id}`)
        const objectData = asyncData ? JSON.parse(asyncData) : []

        let entriesTotal = 0;
        let expensiesTotal = 0;

        const transactionsFormatted: DataProps[] = objectData.map((item: DataProps) => {
            if (item.type === 'positive') entriesTotal += item.amount
            else if (item.type === 'negative') expensiesTotal += item.amount

            const amount = Number(item.amount).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
            })

            const date = Intl.DateTimeFormat('pt-br', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                type: item.type,
                name: item.name,
                amount,
                category: item.category,
                date,
            }
        })

        const total = entriesTotal - expensiesTotal

        setTransactions(transactionsFormatted)
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: transactionsPeriod(objectData, 'positive')
            },
            expensies: {
                amount: expensiesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: transactionsPeriod(objectData, 'negative')
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: transactionsPeriod(objectData, 'total')
            }
        })

        setIsLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, []))

    return (
        <Container>

            {isLoading ? (
                <LoadContainer>
                    <LoadingIndicator color={theme.colors.primary} />
                </LoadContainer>
            ) : (
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: user.photo }} />

                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <Username>{user.name}</Username>
                                </User>
                            </UserInfo>
                            <Borderless
                                onPress={() => { signOut() }}
                            >
                                <Icon name="power" />
                            </Borderless>
                        </UserWrapper>

                    </Header>

                    <HighlightCards>
                        <HighlightCard
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction={
                                highlightData.entries.lastTransaction === false ? 'Não informado' :
                                    `Última entrada dia ${highlightData.entries.lastTransaction}`
                            }
                            type="up"
                        />
                        <HighlightCard
                            title="Saídas"
                            amount={highlightData.expensies.amount}
                            lastTransaction={
                                highlightData.expensies.lastTransaction === false ? 'Não informado' :
                                    `Última saída dia ${highlightData.expensies.lastTransaction}`
                            }
                            type="down"
                        />
                        <HighlightCard
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction={
                                highlightData.total.lastTransaction === false ? 'Não informado' :
                                    highlightData.total.lastTransaction
                            }
                            type="total"
                        />
                    </HighlightCards>

                    <Transactions>
                        <TransactionsTitle>Listagem</TransactionsTitle>

                        <TransactionsList
                            data={transactions}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                            keyExtractor={(item) => item.id}
                            ListEmptyComponent={
                                <EmptyContainer>
                                    <EmptyTitle>Você ainda não possui transações</EmptyTitle>
                                    <EmptyButton
                                        onPress={() => navigation.navigate('Cadastrar')}
                                    >
                                        <EmptyText>Adicione na aba cadastrar</EmptyText>
                                    </EmptyButton>
                                </EmptyContainer>
                            }
                        />
                    </Transactions>
                </>
            )}

        </Container>
    )
}