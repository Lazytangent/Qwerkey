import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import configureStore from "./store";
import ModalProvider from "./context/ModalContext";
import AuthProvider from "./context/AuthContext";
import CreatePostProvider from "./context/CreatePostContext";
import CommentProvider from "./context/CommentContext";
import DarkModeProvider from "./context/DarkModeContext";

import * as sessionActions from "./store/session";
import * as postActions from "./store/posts";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.postActions = postActions;
}

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <AuthProvider>
          <CreatePostProvider>
            <CommentProvider>
              <DarkModeProvider>
                <App />
              </DarkModeProvider>
            </CommentProvider>
          </CreatePostProvider>
        </AuthProvider>
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
