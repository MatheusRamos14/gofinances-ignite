import React from 'react';
import { FlatList } from 'react-native';

import { Button } from '../../Components/Form/Button';
import { categories } from '../../utils/categories';
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    CategoryTitle,
    Separator,
    Footer
} from './styles';

interface Category {
    key: string,
    name: string,
}

interface Props {
    category: Category,
    setCategory: (category: Category) => void,
    closeCategorySelect: () => void,
}

export function CategorySelect({
    category,
    setCategory,
    closeCategorySelect
}: Props) {
    function handleCategorySelect(category: Category) {
        setCategory(category)
    }

    return (
        <Container>
            <Header>
                <Title>Categorias</Title>
            </Header>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <CategoryTitle>{item.name}</CategoryTitle>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button
                    title="Selecionar"
                    onPress={closeCategorySelect}
                />
            </Footer>
        </Container>

    );
}