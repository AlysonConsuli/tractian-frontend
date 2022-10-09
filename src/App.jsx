import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { UserProvider } from "./contexts/UserContext";
import { Router } from "./routes/Routes";
import { GlobalStyle } from "./styles/globalStyle";
import { theme } from "./styles/theme";

export const App = () => {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <UserProvider>
          <GlobalStyle />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </>
  );
};
