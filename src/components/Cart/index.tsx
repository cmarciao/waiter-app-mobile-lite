import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/Cart';

import {
    Item,
    ProductContainer,
    Image,
    QuantityContainer,
    ProductDetails,
    Actions,
    Summary,
    TotalContainer
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { api } from '../../utils/api';

interface CartProps {
    cartItems: CartItem[];
    onAdd: (product: Product) => void;
    onDecremment: (product: Product) => void;
    onConfirmOrder: () => void;
    selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecremment, onConfirmOrder, selectedTable }: CartProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmedOrderModal, setOpenConfirmedOrderModal] = useState(false);

    const total = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price;
    }, 0);

    async function handleConfirmOrder() {
        setIsLoading(true);

        const payload = {
            table: selectedTable,
            products: cartItems.map((cartItem) => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity
            }))
        };

        await api.post('/orders', payload);

        setIsLoading(false);
        setOpenConfirmedOrderModal(true);
    }

    function handleOk() {
        onConfirmOrder();
        setOpenConfirmedOrderModal(false);
    }

    return (
        <>
            <OrderConfirmedModal
                isVisible={openConfirmedOrderModal}
                onOk={handleOk}
            />
            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={(cartItem) => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight:150 }}
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
                                <TouchableOpacity
                                    style={{ marginRight: 24 }}
                                    onPress={() => onAdd(item.product)}
                                >
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onDecremment(item.product)}>
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}

            <Summary>
                <TotalContainer>
                    {cartItems.length === 0 && (
                        <Text color='#999'>Seu carrinho está vazio</Text>
                    )}

                    {cartItems.length > 0 && (
                        <>
                            <Text color='#666'>Total</Text>
                            <Text size={20} weight='600'>{formatCurrency(total)}</Text>
                        </>
                    )}
                </TotalContainer>

                <Button
                    onPress={handleConfirmOrder}
                    disabled={cartItems.length === 0}
                    loading={isLoading}
                >
                    Confirmar pedido
                </Button>
            </Summary>
        </>
    );
}
