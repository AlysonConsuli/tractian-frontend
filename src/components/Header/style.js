import styled from "styled-components";

import { FiLogOut } from "react-icons/fi";

export const Header = styled.header`
  padding: 0 25px;
  position: sticky;
  z-index: 11;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  /* margin-bottom: 20px; */
  h1 {
    font-size: 28px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
  }
  svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Title = styled.div`
  text-align: center;
`;

export const LogoutIcon = styled(FiLogOut)`
  font-size: 25px;
  cursor: pointer;
`;
