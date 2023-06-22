import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Text } from '../Text';

import {
    Overlay,
    ModalBody,
    Header,
    Form,
    Input
} from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';
import { useState } from 'react';

interface TableModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (table: string) => void;
}

export function TableModal({ isVisible, onClose, onSave }: TableModalProps) {
    const [table, setTable] = useState('');

    function handleSave() {
        setTable('');
        onSave(table);
        onClose();
    }

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType='fade'
        >
            <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'} >
                <ModalBody>
                    <Header>
                        <Text weight='600' >Informe a mesa</Text>

                        <TouchableOpacity onPress={onClose}>
                            <Close color='#666' />
                        </TouchableOpacity>
                    </Header>

                    <Form>
                        <Input
                            placeholder="Informe o número da mesa"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTable}
                        />

                        <Button onPress={handleSave} disabled={!table}>
                            Salvar
                        </Button>
                    </Form>
                </ModalBody>
            </Overlay>
        </Modal>
    );
}
