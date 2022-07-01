import { createGlobalStyle } from "styled-components"
export const GLobalStyle = createGlobalStyle`

body {

  padding: 20px 40px;
  font-family: 'Open Sans', sans-serif;
  
  @media screen and (max-width:800px){
    padding:10px
  }
}

a {
  text-decoration: none;
  color: black;
}
* {
  box-sizing: border-box;
}
`