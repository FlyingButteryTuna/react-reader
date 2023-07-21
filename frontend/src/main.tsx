import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "././fonts.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

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

const queryClient = new QueryClient();

axios.defaults.baseURL = "http://192.168.0.101:8080";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
