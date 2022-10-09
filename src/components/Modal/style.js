import styled from "styled-components";

export const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

export const ModalStyle = styled.div`
  width: 41.5vw;
  min-width: 597px;
  height: 262px;
  background-color: #333333;
  border-radius: 50px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 48px;
  line-height: 39px;
  span {
    font-size: 34px;
    color: ${({ theme }) => theme.colors.secondary};
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 27px;
    button {
      width: 9.3vw;
      min-width: 114px;
      height: 37px;
      background: ${({ theme }) => theme.colors.buttonBackground};
      border-radius: 5px;
      font-family: ${({ theme }) => theme.fonts.mainFont};
      font-weight: 700;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.secondary};
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:first-child {
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.buttonBackground};
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    min-width: 280px;
    height: 150px;
    line-height: 30px;
    gap: 10px;
    span {
      font-size: 22px;
    }
    div {
      gap: 20px;
      button {
        width: 80px;
        min-width: 0px;
        height: 30px;
        font-size: 12px;
      }
    }
  }
`;
