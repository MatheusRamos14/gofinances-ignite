import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';
import {
    Container,
    Error,
    ErrorIcon,
    ErrorText,
} from './styles';

interface Props extends TextInputProps {
    name: string,
    control: Control,
    error: string,
}

export function InputForm({
    name,
    control,
    error,
    ...rest
}: Props) {
    return (
        <Container>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
            />
            {error && (
                <Error>
                    <ErrorIcon name="x-circle" />
                    <ErrorText>{error}</ErrorText>
                </Error>
            )}
        </Container>
    )
}