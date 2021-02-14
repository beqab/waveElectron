import React, { Component } from "react";
import { MDBSelect, MDBBtn, MDBInput } from "mdbreact";

import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
const { ipcRenderer } = require("electron");

const welcome = ({ changeContent }) => {
  const { userKey } = React.useContext(WalletKeyContext);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  return (
    <div className="mb-5 p-4">
      {/* <h2 className="text-center mb-5">welcome to WAVE</h2> */}

      <div className="d- ttttttttt justify-content-center flex-column">
        <>
          <div>
            <MDBInput
              label="Password"
              //   icon="lock"
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length >= 6) {
                  setPasswordError("");
                }
              }}
              type="password"
              validate
            />
            {passwordError && (
              <div
                style={{
                  color: "red",
                  marginTop: "-37px",
                  fontSize: "14px",
                  textAlign: "left",
                  marginBottom: "20px",
                }}
              >
                {" "}
                {passwordError}{" "}
              </div>
            )}
            <MDBInput
              label="Confirm Password"
              //   icon="lock"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value === password) {
                  setConfirmPasswordError("");
                }
              }}
              type="password"
              validate
            />
            {confirmPasswordError && (
              <div
                style={{
                  color: "red",
                  marginTop: "-37px",
                  fontSize: "14px",
                  textAlign: "left",
                  marginBottom: "20px",
                }}
              >
                {" "}
                {confirmPasswordError}{" "}
              </div>
            )}
          </div>
          <MDBBtn
            onClick={() => {
              if (password.length < 6) {
                return setPasswordError("enter minimum 6 characters");
              } else {
                setPasswordError("");
              }
              if (password !== confirmPassword) {
                return setConfirmPasswordError(
                  "The password confirmation does not match."
                );
              } else {
                setConfirmPasswordError("");
              }

              ipcRenderer.send("setPassword", {
                password,
              });
              changeContent("Welcome");
            }}
            color="light-green btnMain w-100 mx-0 my-4"
          >
            save password
          </MDBBtn>
        </>

        <br />
      </div>
    </div>
  );
};

export default welcome;
