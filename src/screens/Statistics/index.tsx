import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

import { CategoryCard } from '../../Components/CategoryCard';
import { useAuth } from "../../hooks/auth";
import { categories } from "../../utils/categories";
import {
    Container,
    Header,
    HeaderTitle,
    Content,
    ChartContainer,
    MonthSelector,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
    LoadIndicator,
} from './styles';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    name: string;
    total: number;
    percent: string;
    color: string;
}


export function Statistics() {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
    const [selectedDate, setSelectedDate] = useState(new Date())

    const { user }  = useAuth()

    async function loadData() {
        setIsLoading(true)
        console.log('opa')
        const dataKey = `@gofinances:transactions:user=${user.id}`
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensies = responseFormatted
            .filter((expensies: TransactionData) =>
                expensies.type === 'negative' &&
                new Date(expensies.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensies.date).getFullYear() === selectedDate.getFullYear()
            )

        const total = expensies.reduce(
            (acumulator: number, expensies: TransactionData) => {
                return acumulator + Number(expensies.amount)
            }, 0)

        const totalByCategory: CategoryData[] = [];

        categories.forEach(categorie => {
            let categorySum = 0;

            expensies.forEach((expensie: TransactionData) => {
                if (categorie.key === expensie.category)
                    categorySum += Number(expensie.amount)
            })

            if (categorySum > 0) {
                totalByCategory.push({
                    name: categorie.name,
                    total: categorySum,
                    percent: `${Number(categorySum / total * 100).toFixed(1)}%`,
                    color: categorie.color,
                })
            }
        })

        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }

    function handleToggleMonth(action: "next" | "prev") {
        if (action === 'prev')
            setSelectedDate(subMonths(selectedDate, 1))
        else if (action === 'next')
            setSelectedDate(addMonths(selectedDate, 1))
    }

    useFocusEffect(useCallback(() => {
        loadData()
    }, [selectedDate]))

    return (
        <Container>
            <Header>
                <HeaderTitle>Resumo por categoria</HeaderTitle>
            </Header>

            {isLoading ? (
                <LoadContainer>
                    <LoadIndicator color={theme.colors.primary} />
                </LoadContainer>
            ) : (

                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight()
                    }}
                >
                    <MonthSelector>
                        <MonthSelectButton
                            onPress={() => { handleToggleMonth('prev') }}
                        >
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                        <MonthSelectButton
                            onPress={() => { handleToggleMonth('next') }}
                        >
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelector>

                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            x="percent"
                            y="total"
                            labelRadius={50}
                            style={{
                                labels: {
                                    fontSize: RFValue(17),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                        />
                    </ChartContainer>

                    {totalByCategories.map(totalByCategory => (
                        <CategoryCard
                            title={totalByCategory.name}
                            amount={totalByCategory.total}
                            color={totalByCategory.color}
                            key={totalByCategory.name}
                        />
                    ))}
                </Content>
            )}

        </Container>
    );
}