import React from "react";
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from "react-native-svg";

import {
    Container,
    ImageContainer,
    ButtonLabel,
} from './styles';

interface SocialButtonProps extends RectButtonProps {
    title: string,
    Svg: React.FC<SvgProps>
}

export function SocialButton({ title, Svg, ...rest }: SocialButtonProps) {
    return (
        <Container {...rest}>
            <ImageContainer>
                <Svg />
            </ImageContainer>

            <ButtonLabel>
                {title}
            </ButtonLabel>
        </Container>
    );
}