// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import ChatProvider from "./Context/ChatProvider";
import "./index.css";


  ReactDOM.render(
    <BrowserRouter>
        <ChatProvider>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </ChatProvider>
    </BrowserRouter>,
    document.getElementById("root")
);