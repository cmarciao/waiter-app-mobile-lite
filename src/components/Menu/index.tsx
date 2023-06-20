import { FlatList } from 'react-native';

import { formatCurrency } from '../../utils/formatCurrency';

import { Text } from '../Text';
import { PlusCircle } from '../Icons/PlusCircle';

import {
    Product,
    ProductImage,
    ProductDetails,
    Separator,
    AddToCartButton
} from './styles';

import { products } from '../../mocks/products';

export function Menu() {
    return (
        <FlatList
            data={products}
            style={{ marginTop: 32 }}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            keyExtractor={(product) => product._id}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => (
                <Product>
                    <ProductImage
                        source={{
                            uri: item.imagePath
                        }}
                    />

                    <ProductDetails>
                        <Text weight='600'>
                            {item.name}
                        </Text>
                        <Text size={14} color='#666' style={{ marginVertical: 8 }}>
                            {item.description}
                        </Text>
                        <Text size={14} weight='600'>
                            {formatCurrency(item.price)}
                        </Text>
                    </ProductDetails>

                    <AddToCartButton>
                        <PlusCircle />
                    </AddToCartButton>
                </Product>
            )}
        />
    );
}
