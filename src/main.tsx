import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/exo";
import React from "react";
import ReactDOM from "react-dom";
import theme from "~/theme";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
