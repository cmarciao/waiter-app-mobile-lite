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

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    return (
        <>
            <Container>
                <Header />

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
