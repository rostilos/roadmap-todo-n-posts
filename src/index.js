import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppDataProvider from "./context/App/AppDataProvider";
import NotesDataProvider from "./context/Notes/NotesDataProvider";
import CommunityDataProvider from "./context/Community/CommunityDataProvider";
import PostsDataProvider from "./context/Posts/PostsDataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppDataProvider>
      <CommunityDataProvider>
        <NotesDataProvider>
          <PostsDataProvider>
            <App />
          </PostsDataProvider>
        </NotesDataProvider>
      </CommunityDataProvider>
    </AppDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
