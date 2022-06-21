import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Sign } from '../screens/Sign';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator
            screenOptions={{ headerShown: false }}
        >
            <Screen name="Sign" component={Sign} />
        </Navigator>
    );
}