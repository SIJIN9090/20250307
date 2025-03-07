import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, HttpHeadersProvider } from "./context"; // context 임포트
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    {/* AuthContext 제공 */}
    <HttpHeadersProvider>
      {/* HttpHeadersContext 제공 */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </HttpHeadersProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
