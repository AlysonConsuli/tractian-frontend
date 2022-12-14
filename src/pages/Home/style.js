import styled from "styled-components";

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 16px;
  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-family: "Saira Stencil One";
    text-align: center;
  }
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    span {
      font-size: 14px;
    }
  }
`;

export const HomeMsg = styled.div`
  margin: 5px 0 0 10px;
`;
