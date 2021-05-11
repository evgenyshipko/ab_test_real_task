import styled from 'styled-components';

export const Button = styled.button`
    height: 38px;
    width: 90px;
    border-radius: 10px;
    background-color: #4a9dff;
    color: white;

    border: 2px solid #4a9dff;

    &:hover:not(:disabled) {
        background-color: #b5d8ff;
    }

    &:active:not(:disabled) {
        background-color: #4a9dff;
    }

    transition: background-color 0.2s linear;
`;
