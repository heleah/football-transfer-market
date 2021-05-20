import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    box-sizing: border-box;
    font-family: Helvetica, sans-serif;
}

body {
    background-image: url('https://images.unsplash.com/photo-1522947961977-67fe74257c16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
`;
