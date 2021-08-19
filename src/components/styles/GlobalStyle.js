import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --font-primary: "poppins";
        --primary-color: #f7f8f3;
        --secondary-color: #292929;
        --focus-visible: 3px solid blanchedalmond;
    }
        
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: var(--font-primary);
    }

     body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--primary-color);
      }
      
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
          monospace;
      }
`;

export default GlobalStyle;
