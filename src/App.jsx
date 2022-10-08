import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { UserProvider } from "./contexts/UserContext";
import { Signin } from "./pages/Signin";
import { GlobalStyle } from "./styles/globalStyle";
import { theme } from "./styles/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
};
