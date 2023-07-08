import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const ruby = {
  styles: {
    global: {
      rtboten: {
        fontSize: "20px",
      },
      rt: {
        userSelect: "none",
      },
      standup: {
        textOrientation: "upright",
      },
      body: {
        writingMode: "vertical-rl",
        margin: 0,
        padding: 0,
      },
      html: {
        scrollbarWidth: "thin",
        scrollbarColor: "gray white",
      },
      "&::-webkit-scrollbar": {
        height: "4px",
        width: "4px",
      },

      "&::-webkit-scrollbar-thumb": {
        background: "gray",
        borderRadius: "1px",
      },
    },
  },
};

const theme = extendTheme(ruby);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
