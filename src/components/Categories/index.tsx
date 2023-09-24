import { FlatList } from 'react-native';

import { Text } from '../Text';

import { Container, Icon } from './styles';
import { useState } from 'react';
import { Category } from '../../types/Category';

interface CategoriesProps {
    categories: Category[];
    onSelectCategory: (product: string) => void;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
    const [selectedCategory, setSelectedCategory] = useState('');

    function handleSelectCategory(categoryId: string) {
        const category = selectedCategory === categoryId ? '' : categoryId;

        onSelectCategory(category);
        setSelectedCategory(category);
    }

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            contentContainerStyle={{ paddingRight: 24 }}
            keyExtractor={category => category._id}
            renderItem={({ item }) => {
                const isSelected = selectedCategory === item._id;

                return (
                    <Container onPress={() => handleSelectCategory(item._id)}>
                        <Icon>
                            <Text opacity={isSelected ? 1 : 0.5}>{item.icon}</Text>
                        </Icon>

                        <Text
                            size={14}
                            weight='600'
                            opacity={isSelected ? 1 : 0.5}
                        >
                            {item.name}
                        </Text>
                    </Container>
                );
            }}
        />
    );
}
