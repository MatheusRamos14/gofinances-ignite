import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons, Feather } from '@expo/vector-icons';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Statistics } from '../screens/Statistics';

const { Screen, Navigator } = createBottomTabNavigator();

export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarLabelStyle: {
                    fontFamily: theme.fonts.medium,
                    fontSize: RFValue(14),
                },
                tabBarStyle: {
                    backgroundColor: theme.colors.shape,
                    height: RFValue(72),
                }
            }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialIcons name="format-list-bulleted" size={size} color={color} />
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => <Feather name="dollar-sign" size={size} color={color} />
                }}
            />
            <Screen
                name="Resumo"
                component={Statistics}
                options={{
                    tabBarIcon: ({ size, color }) => <Feather name="pie-chart" size={size} color={color} />
                }}
            />
        </Navigator>
    );
}
