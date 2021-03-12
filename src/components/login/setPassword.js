import React, { Component } from "react";
import { MDBSelect, MDBBtn, MDBInput } from "mdbreact";

import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
const { ipcRenderer } = require("electron");

const welcome = ({ changeContent }) => {
  const { userKey } = React.useContext(WalletKeyContext);
  const [password, setPassword] = React.useState("");
  const [forgot, setForgot] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  React.useEffect(() => {
    ipcRenderer.send("getFile", {});
  }, []);

  return (
    <div className="my-4 p-4">
      {/* <h2 className="text-center mb-5">welcome to WAVE</h2> */}
      {forgot ? (
        <div className="d- ttttttttt justify-content-center flex-column">
          <>
            <h6 className="text-center mt-5">
              If you Reset Password you will lost all Wallets
            </h6>
            <div className="d-flex">
              <MDBBtn
                onClick={() => {
                  // ipcRenderer.send("resetWallet", {});
                  // changeContent("Welcome");
                  // setForgot(null);
                  setForgot(false);
                }}
                color="light-green btnMain btnWithFrame w-100 m-3 mx-0 my-4"
              >
                Cancel
              </MDBBtn>

              <MDBBtn
                onClick={() => {
                  ipcRenderer.send("resetWallet", {});
                  // changeContent("Welcome");
                  setForgot(false);
                }}
                color="light-green btnWithFrame btnMain m-3 w-100 mx-0 my-4"
              >
                Reset Password
              </MDBBtn>
            </div>
          </>

          <br />
        </div>
      ) : !userKey || !userKey.password ? (
        <div className="d- ttttttttt justify-content-center flex-column">
          <>
            <h6 className="text-center mb-5">
              Set your wave Application password
            </h6>
            <div>
              <input
                placeholder="Password"
                //   icon="lock"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length >= 6) {
                    setPasswordError("");
                  }
                }}
                className="newInput d-block w-100 mb-4"
                type="password"
                // validate
              />
              {passwordError && (
                <div
                  style={{
                    color: "#ff8383",
                    marginTop: "-17px",
                    fontSize: "14px",
                    textAlign: "left",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {passwordError}{" "}
                </div>
              )}
              <input
                placeholder="Confirm Password"
                className="newInput d-block w-100"
                //   icon="lock"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value === password) {
                    setConfirmPasswordError("");
                  }
                }}
                type="password"
                // validate
              />
              {confirmPasswordError && (
                <div
                  style={{
                    color: "#ff8383",
                    marginTop: "8px",
                    fontSize: "14px",
                    textAlign: "left",
                    marginBottom: "10px",
                    fontWeight: "bold",
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
                setPassword("");

                ipcRenderer.send("setPassword", {
                  password,
                });
                // changeContent("Welcome");
              }}
              color="light-green btnMain w-100 btnWithFrame mt-5 mx-0 my-4"
            >
              save password
            </MDBBtn>
          </>

          <br />
        </div>
      ) : (
        <div className="d- modalContent justify-content-center flex-column">
          <>
            <h6 className="text-center">
              Enter your wave Application password
            </h6>

            <div>
              <input
                // label="Password"
                placeholder="Password"
                //   icon="lock"

                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length >= 6) {
                    setPasswordError("");
                  }
                }}
                value={password}
                className="mb-0 newInput w-100 d-block mt-5 mb-1"
                type="password"
                // validate
              />
              {passwordError && (
                <div
                  style={{
                    color: "#ff8383",

                    marginTop: "7px",
                    fontSize: "14px",
                    textAlign: "left",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {passwordError}{" "}
                </div>
              )}
              <a
                href=""
                style={{
                  // transform: "translateY(-14px)",
                  color: "#fff",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setForgot(true);
                }}
              >
                {" "}
                Forgot Password?
              </a>
            </div>
            <MDBBtn
              onClick={() => {
                if (password !== userKey.password) {
                  debugger;
                  return setPasswordError("wrong password");
                } else {
                  setPasswordError("");
                }

                ipcRenderer.send("authWithPassword", {
                  isAuth: true,
                });
                changeContent("first");
              }}
              color="light-green btnMain w-100 mx-0 mt-5 btnWithFrame my-4"
            >
              Sign In
            </MDBBtn>
          </>

          <br />
        </div>
      )}
    </div>
  );
};

export default welcome;
