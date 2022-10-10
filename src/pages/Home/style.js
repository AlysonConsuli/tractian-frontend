import styled from "styled-components";

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 16px;
  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px;
  }
`;
