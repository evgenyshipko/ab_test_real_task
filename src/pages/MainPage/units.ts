import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Ubuntu', sans-serif;

    width: 100%;
    height: 100%;
`;

export const Paper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 70%;
    height: 100%;
    background-color: #f9f9f9;
`;

export const TableBlock = styled.div`
    display: flex;
    justify-content: center;

    width: 90%;
    height: 400px;
`;

export const ButtonBlock = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;

    height: 50px;
    width: 100%;
`;
