import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';

import { Container,
    CategoriesContainer,
    MenuContainer,
    FooterContainer,
    FooterContent
} from './styles';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';
import { CartItem } from '../types/Cart';
import { Cart } from '../components/Cart';
import { products } from '../mocks/products';

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            product: products[0],
            quantity: 1
        },
        {
            product: products[1],
            quantity: 2
        }
    ]);

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleCancelOrder() {
        setSelectedTable('');
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleCancelOrder}
                />

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>

                <MenuContainer>
                    <Menu />
                </MenuContainer>
            </Container>
            <FooterContainer>

                <FooterContent>
                    {!selectedTable && (
                        <Button onPress={() => setIsTableModalVisible(true)}>
                            Novo pedido
                        </Button>
                    )}

                    {selectedTable && (
                        <Cart
                            cartItems={cartItems}
                        />
                    )}
                </FooterContent>
            </FooterContainer>

            <TableModal
                isVisible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSaveTable}
            />
        </>
    );
}
