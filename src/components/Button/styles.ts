import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;

    border-radius: 48px;
    background-color: ${({ disabled }) => disabled ? '#999': '#D73035'};

    padding: 14px 24px;
`;
