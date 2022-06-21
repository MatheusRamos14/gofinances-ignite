import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { CategorySelect } from '../CategorySelect';
import { Button } from '../../Components/Form/Button';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';
import { InputForm } from '../../Components/Form/InputForm';
import { useAuth } from '../../hooks/auth';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TypeSelection,
} from './styles';

interface FormData {
    [key: string]: string
}

interface NavProps {
    navigate: (screen: string) => void,
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório.'),
    amount: Yup
        .number()
        .typeError('Formato númerico inválido')
        .required('O preço é obrigatório')
        .positive('O preço deve ser um valor positivo.')
})

export function Register() {
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [selectedType, setSelectedType] = useState('')

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const { navigate } = useNavigation<NavProps>();

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const { user } = useAuth();

    function handleSelectType(type: string) {
        setSelectedType(type)
    }

    function handleOpenCategorySelectModal() {
        setShowCategorySelect(true)
    }

    function handleCloseCategorySelectModal() {
        setShowCategorySelect(false)
    }

    async function handleRegister(form: FormData) {
        if (!selectedType)
            return Alert.alert('Selecione um tipo de transação')

        if (category.key === 'category')
            return Alert.alert('Selecione uma categoria.')
            
        try {

            const asyncData = await AsyncStorage.getItem(`@gofinances:transactions:user=${user.id}`)
    
            const prevData = asyncData ? JSON.parse(asyncData) : []
    
            const formattedData = [
                {
                    id: String(uuid.v4()),
                    name: form.name,
                    amount: Number(form.amount),
                    type: selectedType,
                    category: category.key,
                    date: new Date()
                },
                ...prevData,
            ]
    
            await AsyncStorage.setItem(`@gofinances:transactions:user=${user.id}`, JSON.stringify(formattedData));
    
            setSelectedType('')
            setCategory({
                key: 'category',
                name: 'Categoria'
            })
            reset();
            navigate('Listagem')
        } catch (error) {
            console.log(error)
            return Alert.alert('Não foi possível adicionar o item.')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name='name'
                            control={control}
                            placeholder='Nome'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />

                        <TypeSelection>
                            <TransactionTypeButton
                                title="Income"
                                type="positive"
                                onPress={() => handleSelectType('positive')}
                                isActive={selectedType === 'positive'}
                            />
                            <TransactionTypeButton
                                title="Outcome"
                                type="negative"
                                onPress={() => handleSelectType('negative')}
                                isActive={selectedType === 'negative'}
                            />
                        </TypeSelection>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenCategorySelectModal}
                        />
                    </Fields>

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={showCategorySelect}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeCategorySelect={handleCloseCategorySelectModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}