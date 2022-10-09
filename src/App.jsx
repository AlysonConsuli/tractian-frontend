import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { UserProvider } from "./contexts/UserContext";
import { Router } from "./routes/Routes";
import { GlobalStyle } from "./styles/globalStyle";
import { theme } from "./styles/theme";
import ptBR from "antd/lib/locale/pt_BR";

export const App = () => {
  return (
    <>
      <ConfigProvider locale={ptBR}>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <UserProvider>
            <GlobalStyle />
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </UserProvider>
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
};
