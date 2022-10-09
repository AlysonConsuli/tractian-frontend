import styled from "styled-components";

export * from "../pages/Signin/style.js";
export * from "../components/Modal/style.js";
export * from "../components/Header/style.js";

export const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.mainBackground};
`;
