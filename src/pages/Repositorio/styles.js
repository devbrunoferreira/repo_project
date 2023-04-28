import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Loading = styled.div`
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;
`;

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1 {
        color: #008394;
        font-size: 30px;
    }

    p {
        margin-top: 15px;
        font-size: 14px;
        line-height: 1.4;
        color: #000;
        max-width: 400px;
        text-align: center;
    }
`;

export const BackButton = styled(Link)`
    background-color: transparent;
    color: #008394;
    border: 0;
    outline: 0;
`;

export const IssuesList = styled.div`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #008394;
        }

        div {
            flex: 1;
            margin-left: 12px;

            p {
                margin-top: 10px;
                font-size: 12px;
                color: #000;
            }

            strong {
                font-size: 15px;

                a {
                    text-decoration: none;
                    color: #222;
                    transition: 0.3s;

                    &:hover {
                        color: #008394;
                    }
                }

                span {
                    background-color: #222;
                    color: #FFF;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 4px 7px;
                    margin-left: 10px;
                }
            }
        }
    }
`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        background-color: #222;
        color: #FFF;
        padding: 5px 10px;
        border-radius: 4px;
        border: none;
        outline: 0;
    }

`;