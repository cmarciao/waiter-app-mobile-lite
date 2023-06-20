import { FlatList } from 'react-native';

import { categories } from '../../mocks/categories';
import { Text } from '../Text';

import { Container, Icon } from './styles';
import { useState } from 'react';

export function Categories() {
    const [selectedCategory, setSelectedCategory] = useState('');

    function handleSelectCategory(categoryId: string) {
        const category = selectedCategory === categoryId ? '' : categoryId;
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
