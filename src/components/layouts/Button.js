import styled from "styled-components";

export const Button = styled.button`
  font-family: "Architects Daughter", cursive;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid var(--background);
  background: var(--main-color);
  color: var(--background);
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &&:active {
    transform: scale(0.95);
  }
  &&:focus {
    outline: none;
  }
  &&.ghost {
    background: transparent;
    background-color: var(--background);
    border-color: #fff;
    color: var(--main-color);
  }
`;
