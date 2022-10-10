import styled from "styled-components";

export * from "../pages/Signin/style.js";
export * from "../pages/Home/style.js";
export * from "../components/Modal/style.js";
export * from "../components/Card/style.js";
export * from "../components/Logout/style.js";

export const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.mainBackground};
`;
