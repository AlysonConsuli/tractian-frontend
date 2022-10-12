import styled from "styled-components";

export const BoxAuthLogo = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin-bottom: 60px;
  background-color: ${({ theme }) => theme.colors.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 44px;
    margin-bottom: 7px;
    text-align: center;
    font-family: "Saira Stencil One";
  }
`;
