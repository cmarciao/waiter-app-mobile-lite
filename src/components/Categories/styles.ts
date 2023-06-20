import styled from 'styled-components/native';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.TouchableOpacity`
    align-items: center;
    margin-left: 24px;
`;

export const Icon = styled.View`
    width: 44px;
    height: 44px;

    align-items: center;
    justify-content: center;

    border-radius: 22px;
    background: #FFF;

    box-shadow: 10px 20px 10px red;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, ${isAndroid ? 1 : 0.1});
    elevation: 2;


    margin-bottom: 8px;
`;
