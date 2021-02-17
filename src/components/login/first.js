import React, { Component } from "react";
import { MDBSelect, MDBBtn, MDBInput } from "mdbreact";

import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
const { ipcRenderer } = require("electron");

const welcome = ({ changeContent }) => {
  const { userKey } = React.useContext(WalletKeyContext);
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [accountError, setAccountError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  return (
    <div className="mb-5 p-4">
      {/* <h2 className="text-center mb-5">welcome to WAVE</h2> */}

      <div className="d-flex justify-content-center flex-column">
        {userKey?.wallets && (
          <>
            {" "}
            <select
              className="browser-default custom-select"
              selected="Choose your Account"
              onChange={(e) => {
                setCurrentAccount(e.target.value);
                setAccountError("");
              }}
            >
              <option value="" selected disabled hidden>
                Select Your Account
              </option>
              {userKey?.wallets.map((el) => {
                return <option>{el.accountName}</option>;
              })}
            </select>
            {accountError && (
              <div
                style={{
                  color: "red",
                  //   marginTop: "-20px",
                  fontSize: "14px",
                  textAlign: "left",
                  //   marginBottom: "20px",
                }}
              >
                {" "}
                {accountError}{" "}
              </div>
            )}
            {/* <MDBInput
              label="Password"
              outline
              //   icon="lock"
              onChange={(e) => {
                setPassword(e.target.value);

                setPasswordError("");
              }}
              type="password"
            />
            {passwordError && (
              <div
                style={{
                  color: "red",
                  marginTop: "-30px",
                  fontSize: "14px",
                  textAlign: "left",
                  //   marginBottom: "20px",
                }}
              >
                {" "}
                {passwordError}{" "}
              </div>
            )} */}
            <MDBBtn
              onClick={() => {
                if (!currentAccount) {
                  return setAccountError("select account");
                }
                // if (password !== userKey?.password) {
                //   debugger;
                //   return setPasswordError("wrong password");
                // }

                ipcRenderer.send("changeAccount", {
                  name: currentAccount,
                });
              }}
              color="light-green btnMain w-100 mx-0 my-4"
            >
              sign in
            </MDBBtn>
          </>
        )}
        <br />
        <a
          href="#"
          className="text-center m-auto"
          onClick={(e) => {
            e.preventDefault();

            if (userKey?.password) {
              changeContent("Welcome");
            } else {
              changeContent("setPassword");
            }
          }}
        >
          create or restore a wallet
        </a>
      </div>
    </div>
  );
};

export default welcome;
