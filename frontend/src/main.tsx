import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "././fonts.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

const theme = extendTheme({
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
        fontFamily: "Noto Sans Japanese",
        WebkitTextSizeAdjust: "none",
        WebkitFontSmoothing: "antialiased",
      },
      html: {
        WebkitTextSizeAdjust: "none",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
