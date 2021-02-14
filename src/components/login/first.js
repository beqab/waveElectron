import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
const { ipcRenderer } = require("electron");

const welcome = ({ changeContent }) => {
  const val = React.useContext(WalletKeyContext);
  const [currentAccount, setCurrentAccount] = React.useState("");

  return (
    <div className="mb-5 p-4">
      {/* <h2 className="text-center mb-5">welcome to WAVE</h2> */}

      <div className="d-flex justify-content-center flex-column">
        {val?.userKey?.wallets && (
          <>
            {" "}
            <select
              onChange={(e) => {
                setCurrentAccount(e.target.value);
              }}
            >
              {val?.userKey?.wallets.map((el) => {
                return <option>{el.accountName}</option>;
              })}
            </select>{" "}
            <button
              onClick={() => {
                debugger;
                ipcRenderer.send("changeAccount", {
                  name: currentAccount,
                });
              }}
            >
              sign in
            </button>
          </>
        )}
        <br />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            changeContent("welcome");
          }}
        >
          create or restore a wallet
        </a>
      </div>
    </div>
  );
};

export default welcome;
