import React, { Component } from "react";
import Welcome from "./welcome";
import NewWalletFrom from "./newWalletForm";
import OldWalletFrom from "./oldWaletFrom";
import Logo from "../../imgs/logo.png";
import First from "./first";
import SetPassword from "./setPassword";

const login = () => {
  const [currentContent, setCurrentContent] = React.useState("first");
  return (
    <div className="login-modal ">
      <div className="container justify-content-center flex-column align-items-center d-flex  ">
        <div className="text-center fff">
          <img width="90" src={Logo} />
          <h4 className="py-3">welcome to WAVE</h4>
        </div>
        <div className="loginBody">
          {currentContent === "first" && (
            <First changeContent={setCurrentContent} />
          )}

          {currentContent === "setPassword" && (
            <SetPassword changeContent={setCurrentContent} />
          )}
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
    </div>
  );
};

export default login;
