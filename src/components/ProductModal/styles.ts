import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
    width: 100%;
    height: 200px;

    align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;

    align-items: center;
    justify-content: center;

    border-radius: 16px;
    background: rgba(0, 0, 0, 0.5);

    margin: 24px;
`;

export const ModalBody = styled.View`
    flex: 1;
    background-color: #FAFAFA;

    padding: 32px 24px 0;
`;

export const Header = styled.View``;

export const IngredientsContainer = styled.View`
    flex: 1;
    margin-top: 32px;
`;

export const Ingredient = styled.View`
    flex-direction: row;
    align-items: center;

    gap: 20px;

    border-radius: 8px;
    border: 1px solid rgba(204, 204, 204, 0.3);

    padding: 16px;
    margin-top: 4px;
`;

export const FooterContainer = styled.View`
    min-height: 110px;
    background: #FFF;
    padding: 16px 24px;
`;

export const FooterContent = styled.SafeAreaView`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const PriceContainer = styled.View``;
