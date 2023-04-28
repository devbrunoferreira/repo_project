import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg {
            margin-right: 10px;
        }
    }

`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.error ? "#FF0000" : "#DDD")};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

// CRIANDO ANIMAÇÃO DO BOTÃO
const animate = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #008394;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;


    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }


    ${props => props.loading &&
        css`
            svg{
                animation: ${animate} 2s linear infinite;
            }
        `
    }

`;


export const List = styled.ul`
    list-style: none;
    font-weight: bold;
    margin-top: 20px;
    font-size: 17px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 15px 0;

        & + li { // ADICIONA O EFEITO DO SEGUNDO EM DIANTE
            border-top: 1px solid #eee;
        }

        a {
            color: #008394;
        }

    }
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    color: #008394;
    margin-right: 10px;
    background: transparent;
    border: none;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;

export const ErroRepo = styled.p`
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    align-items: center;
    color: red;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    
    span {
        margin-left: 5px;
    }
`;