import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Root } from "react-router-dom";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#00AA5B",
      secondary: "#1BDC82",
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Root>
        <App />
      </Root>
    </ChakraProvider>
  </React.StrictMode>
);
