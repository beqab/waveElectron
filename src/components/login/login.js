import React, { Component } from "react";
import Welcome from "./welcome";
import NewWalletFrom from "./newWalletForm";
import OldWalletFrom from "./oldWaletFrom";

const login = () => {
  const [currentContent, setCurrentContent] = React.useState("Welcome");
  return (
    <div className="login-modal ">
      <div className="container justify-content-center align-items-center d-flex  ">
        {currentContent === "Welcome" && (
          <Welcome changeContent={setCurrentContent} />
        )}
        {currentContent === "newWalletForm" && (
          <NewWalletFrom changeContent={setCurrentContent} />
        )}
        {currentContent === "oldWalletForm" && (
          <OldWalletFrom changeContent={setCurrentContent} />
        )}
      </div>
    </div>
  );
};

export default login;
