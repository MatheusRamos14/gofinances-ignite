import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1, }}>
          <StatusBar
            barStyle="light-content"
          />

          <AuthProvider>
            <Routes />
          </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
