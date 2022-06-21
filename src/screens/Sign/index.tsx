import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import Logo from '../../assets/logo.svg';
import GoogleSVG from '../../assets/google.svg';
import AppleSVG from '../../assets/apple.svg';

import { useAuth } from '../../hooks/auth';
import { SocialButton } from '../../Components/SocialButton';
import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignTitle,
    Footer,
    FooterWrapper,
} from './styles';

export function Sign() {
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const { signInWithGoogle, signInWithApple } = useAuth()

    async function handleLoginWithGoogle() {
        setIsLoading(true)
        try {
            await signInWithGoogle();
        } catch (error) {
            Alert.alert(String(error))
            setIsLoading(false);
        }
    }
    async function handleLoginWithApple() {
        setIsLoading(true)
        try {
            await signInWithApple();
        } catch (error) {
            Alert.alert(String(error))
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <Logo
                        width={RFValue(120)}
                        height={RFValue(69)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>


                <SignTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SocialButton
                        title="Entrar com Google"
                        Svg={GoogleSVG}
                        onPress={() => handleLoginWithGoogle()}
                    />

                    {Platform.OS === 'ios' &&
                        <SocialButton
                            title="Entrar com Apple"
                            Svg={AppleSVG}
                            onPress={() => handleLoginWithApple()}
                        />
                    }

                    {isLoading &&
                        <ActivityIndicator
                            size="small"
                            color={theme.colors.shape}
                        />
                    }
                </FooterWrapper>

            </Footer>
        </Container>
    );
}