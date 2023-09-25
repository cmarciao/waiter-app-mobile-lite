import { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';

import { Container,
    CategoriesContainer,
    MenuContainer,
    FooterContainer,
    FooterContent,
    CenteredContainer,
    ErrorContainer,
    ErrorImage
} from './styles';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/Cart';
import { Cart } from '../components/Cart';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import { api } from '../utils/api';

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [hasError, setHasError] = useState(false);

    const loadData = useCallback(() => {
        setIsLoading(true);

        Promise.all([
            api.get('/categories'),
            api.get('/products')
        ]).then(([categoriesResponse, productsResponse]) => {
            setCategories(categoriesResponse.data);
            setProducts(productsResponse.data);

            setIsLoading(false);
            setHasError(false);
        }).catch(() => {
            setIsLoading(false);
            setHasError(true);
        });
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    async function handleSelectCategory(categoryId: string) {
        setIsLoadingProducts(true);

        const route = !categoryId
            ? '/products'
            :`/categories/${categoryId}/products`;

        const response = await api.get(route);
        setProducts(response.data);
        setIsLoadingProducts(false);
    }

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleResetOrder() {
        setSelectedTable('');
        setCartItems([]);
    }

    function handleAddToCart(product: Product) {
        if(!selectedTable) {
            setIsTableModalVisible(true);
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItem =>
                cartItem.product._id === product._id
            );

            if(itemIndex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product
                });
            }

            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1
            };

            return newCartItems;
        });
    }

    function handleDecremmentCartItem(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex((cartItem) =>
                cartItem.product._id === product._id
            );

            const item = prevState[itemIndex];
            const newCartItems = [...prevState];

            if(item.quantity === 1) {
                newCartItems.splice(itemIndex, 1);
                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity - 1
            };

            return newCartItems;
        });
    }

    function handleTryAgain() {
        loadData();
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleResetOrder}
                />

                {isLoading && (
                    <CenteredContainer>
                        <ActivityIndicator color='#D73035' size='large'/>
                    </CenteredContainer>
                )}

                {!isLoading && hasError &&  (
                    <CenteredContainer>
                        <ErrorContainer>
                            <Text size={40} weight={600}>F...</Text>
                            <ErrorImage
                                source={{
                                    uri: 'https://cdn-0.emojis.wiki/emoji-pics/whatsapp/saluting-face-whatsapp.png',
                                }}
                            />
                        </ErrorContainer>

                        <Text style={{ marginTop: 24 }}>Algum erro aconteceu.</Text>
                        <Text>Por favor, tente novamente.</Text>
                    </CenteredContainer>
                )}

                {!isLoading && !hasError && categories.length === 0 && (
                    <CenteredContainer>
                        <Text size={40} weight={600}>🥗🍔🍨</Text>
                        <Text
                            size={28}
                            weight={600}
                            style={{
                                textAlign: 'center',
                                marginTop: 8
                            }}>
                            Você ainda não têm cadastros...
                        </Text>

                        <Text style={{
                            textAlign: 'center',
                            marginTop: 24
                        }}>
                            Você primeiro precisa cadastrar novas categorias e novos produtos.
                        </Text>
                    </CenteredContainer>
                )}

                {!isLoading && !hasError && categories.length !== 0 && (
                    <>
                        <CategoriesContainer>
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts && (
                            <CenteredContainer>
                                <ActivityIndicator color='#D73035' size='large'/>
                            </CenteredContainer>
                        )}

                        {!isLoadingProducts && (
                            <>
                                {products.length == 0 && (
                                    <CenteredContainer>
                                        <Empty />
                                        <Text color='#666' style={{ marginTop: 24 }}>
                                    Nenhum produto foi encontrado
                                        </Text>
                                    </CenteredContainer>
                                )}

                                {products.length > 0 && (
                                    <MenuContainer>
                                        <Menu
                                            products={products}
                                            onAddToCart={handleAddToCart}
                                        />
                                    </MenuContainer>
                                )}
                            </>
                        )}
                    </>
                )}
            </Container>
            <FooterContainer>
                <FooterContent>
                    {categories.length === 0 && (
                        <Button
                            onPress={handleTryAgain}
                        >
                            Recarregar
                        </Button>
                    )}
                    {categories.length !== 0 && (
                        <>
                            {!isLoading && hasError && (
                                <Button
                                    onPress={handleTryAgain}
                                >
                            Tentar novamente
                                </Button>
                            )}
                            {!selectedTable && !hasError && (
                                <Button
                                    onPress={() => setIsTableModalVisible(true)}
                                    disabled={isLoading}
                                >
                            Novo pedido
                                </Button>
                            )}

                            {selectedTable && (
                                <Cart
                                    cartItems={cartItems}
                                    onAdd={handleAddToCart}
                                    onDecremment={handleDecremmentCartItem}
                                    onConfirmOrder={handleResetOrder}
                                    selectedTable={selectedTable}
                                />
                            )}</>
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
