import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/Cart';

import {
    Item,
    ProductContainer,
    Image,
    QuantityContainer,
    ProductDetails,
    Actions
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';

interface CartProps {
    cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps) {
    return (
        <FlatList
            data={cartItems}
            keyExtractor={(cartItem) => cartItem.product._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <Item>
                    <ProductContainer>
                        <Image
                            source={{
                                uri: item.product.imagePath
                            }}
                        />

                        <QuantityContainer>
                            <Text size={14} color='#666'>
                                {item.quantity}
                            </Text>
                        </QuantityContainer>

                        <ProductDetails>
                            <Text size={14} weight='600'>{item.product.name}</Text>
                            <Text size={14} color='#666' style={{ marginTop: 4 }}>
                                {formatCurrency(item.product.price)}
                            </Text>
                        </ProductDetails>
                    </ProductContainer>

                    <Actions>
                        <TouchableOpacity style={{ marginRight: 24 }}>
                            <PlusCircle />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <MinusCircle />
                        </TouchableOpacity>
                    </Actions>
                </Item>
            )}
        />
    );
}
