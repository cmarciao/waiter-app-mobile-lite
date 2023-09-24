import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
    flex: 1;

    background: #FAFAFA;
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
`;

export const CategoriesContainer = styled.View`
    height: 73px;
    margin-top: 34px;
    align-items: flex-start;
`;

export const MenuContainer = styled.View`
    flex: 1;
`;

export const FooterContainer = styled.View`
    min-height: 110px;
    background: #FFF;
    padding: 16px 24px;
`;

export const FooterContent = styled.SafeAreaView`
`;

export const CenteredContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
