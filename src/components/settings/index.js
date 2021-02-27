import React from "react";
import Wave from "../../imgs/logo.png";
import Modal from "../sendModal/sendModal";
import Secur from "../../imgs/Gruppe61.png";

import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
import {
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";

const { ipcRenderer } = require("electron");

function index({ setKeys }) {
  const { userKey } = React.useContext(WalletKeyContext);

  const [password, setPassword] = React.useState("");
  const [tab, setTab] = React.useState("Password");
  const [passwordChanged, setPasswordChanged] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [oldPasswordError, setOldPasswordError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const clearFields = () => {
    setPassword("");
    setOldPassword("");
    setConfirmPassword("");
    setPasswordChanged(true);
  };

  React.useEffect(() => {
    if (setKeys) {
      setTab("Keys");
    }
  }, [setKeys]);

  const getKeysTab = () => {
    return (
      <div
        style={{ background: "#194275", color: "#fff" }}
        className="card p-3 mt-3"
      >
        <p style={{ fontSize: "13px" }}>
          NEVER give you 12-wod backup phrase and private keys to anyone. Giving
          this data may result in loss of your funds
        </p>
        {!passwordChanged && (
          <div style={{ maxWidth: "300px" }} className="m-auto w-100 ">
            <MDBInput
              label="Password"
              //   icon="lock"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
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
                {passwordError}
              </div>
            )}
          </div>
        )}

        {passwordChanged && (
          <div class="alert alert-success" role="alert">
            {userKey.wallets.map((el, i) => {
              return (
                <>
                  <div
                    style={{
                      maxWidth: "100%",
                      wordBreak: " break-all",
                    }}
                    className="d-flex align-times-center flex-column"
                  >
                    <div style={{ minWidth: "70px", alignSelf: "center" }}>
                      <b>Account Name : {el.accountName}</b>
                    </div>
                    <div>
                      <div className>
                        <span>
                          {" "}
                          <b> 12-World </b>
                        </span>
                        <div>{el.wallet}</div>
                      </div>
                      {el.privateKey && (
                        <div>
                          <span>
                            {" "}
                            <b> Private key </b>{" "}
                          </span>
                          <div>{el.privateKey}</div>
                        </div>
                      )}

                      <div>
                        <span>
                          {" "}
                          <b> Public key </b>{" "}
                        </span>
                        <div>{el.key}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
        )}

        {!passwordChanged && (
          <MDBBtn
            onClick={() => {
              if (userKey.password !== password) {
                return setPasswordError("wrong password");
              } else {
                setPasswordError("");
              }

              clearFields();
            }}
            className="btnMain"
          >
            show keys
          </MDBBtn>
        )}
      </div>
    );
  };

  const changePasswordTab = () => {
    return (
      <div
        style={{ background: "#194275", color: "#fff" }}
        className="card p-3 mt-3"
      >
        <p style={{ fontSize: "13px" }}>
          Password keeps your wallet protected by encryption/ Please be careful
          when changing it, tis action cannot be undone. We strongly recommended
          saving the 12 words backup phrase before yo continue.
        </p>

        <div style={{ maxWidth: "300px" }} className="m-auto w-100 ">
          <MDBInput
            label="Old Password"
            //   icon="lock"
            onChange={(e) => {
              setOldPassword(e.target.value);
              // if (e.target.value.length >= 6) {
              //   setPasswordError("");
              // }
            }}
            value={oldPassword}
            type="password"
            validate
          />
          {oldPasswordError && (
            <div
              style={{
                color: "red",
                marginTop: "-37px",
                fontSize: "14px",
                textAlign: "left",
                marginBottom: "20px",
              }}
            >
              {oldPasswordError}
            </div>
          )}

          <MDBInput
            label="Password"
            //   icon="lock"
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length >= 6) {
                setPasswordError("");
              }
            }}
            value={password}
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
              {passwordError}
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
            value={confirmPassword}
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

        {passwordChanged && (
          <div class="alert alert-success" role="alert">
            Password Changed Successfully
          </div>
        )}
        <MDBBtn
          onClick={() => {
            if (userKey.password !== oldPassword) {
              return setOldPasswordError("wrong password");
            } else {
              setOldPasswordError("");
            }
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

            clearFields();
            ipcRenderer.send("setPassword", {
              password,
            });
          }}
          className="btnMain"
        >
          change password
        </MDBBtn>
      </div>
    );
  };
  return (
    <div style={{ marginTop: "50px" }} className="wave-main">
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          viewBox="0 0 123.966 123.153"
        >
          <g
            id="Group_79"
            data-name="Group 79"
            transform="translate(-75.846 -76.786)"
          >
            <g
              id="Group_69"
              data-name="Group 69"
              transform="translate(102.405 102.962)"
            >
              <path
                id="Path_145"
                data-name="Path 145"
                d="M171.124,206.624A35.423,35.423,0,1,1,206.547,171.2,35.464,35.464,0,0,1,171.124,206.624Zm0-67.3A31.873,31.873,0,1,0,203,171.2,31.909,31.909,0,0,0,171.124,139.328Z"
                transform="translate(-135.701 -135.778)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_70"
              data-name="Group 70"
              transform="translate(75.846 76.786)"
            >
              <path
                id="Path_146"
                data-name="Path 146"
                d="M155.177,199.939a1.774,1.774,0,0,1-1.774-1.844c.008-.2.016-.4.016-.6a15.591,15.591,0,0,0-31.182,0c0,.192.007.381.014.571a1.805,1.805,0,0,1-.68,1.481,1.78,1.78,0,0,1-1.586.321,63.713,63.713,0,0,1-14.038-5.969,1.774,1.774,0,0,1-.333-2.829l.113-.106c.074-.07.15-.14.222-.212a15.589,15.589,0,0,0-21.961-22.131,1.774,1.774,0,0,1-2.816-.437A63.632,63.632,0,0,1,75.9,154.628a1.775,1.775,0,0,1,1.67-2.224,15.585,15.585,0,0,0,.8-31.118,1.775,1.775,0,0,1-1.555-2.307,63.788,63.788,0,0,1,5.531-12.538,1.775,1.775,0,0,1,2.667-.482,15.588,15.588,0,0,0,22.29-21.506,1.775,1.775,0,0,1,.577-2.649,63.738,63.738,0,0,1,12.258-4.949,1.775,1.775,0,0,1,2.247,1.462,15.588,15.588,0,0,0,30.876,0,1.775,1.775,0,0,1,2.248-1.462A63.76,63.76,0,0,1,167.772,81.8a1.775,1.775,0,0,1,.576,2.649,15.588,15.588,0,0,0,22.29,21.506,1.775,1.775,0,0,1,2.667.482,63.8,63.8,0,0,1,5.531,12.538,1.775,1.775,0,0,1-1.554,2.307,15.585,15.585,0,0,0,.8,31.118,1.776,1.776,0,0,1,1.671,2.224,63.722,63.722,0,0,1-5.268,13.556,1.775,1.775,0,0,1-2.816.437A15.59,15.59,0,0,0,169.7,190.75c.077.076.155.15.233.222l.1.1a1.775,1.775,0,0,1-.331,2.831,63.7,63.7,0,0,1-14.039,5.969A1.759,1.759,0,0,1,155.177,199.939Zm-17.349-21.583a19.168,19.168,0,0,1,19.064,17.418,60.214,60.214,0,0,0,9.073-3.864,19.14,19.14,0,0,1,26.389-27.387,60.135,60.135,0,0,0,3.393-8.756,19.016,19.016,0,0,1-16.388-18.941,19.238,19.238,0,0,1,15.419-18.772,60.269,60.269,0,0,0-3.583-8.1A19.143,19.143,0,0,1,164.339,84.04a60.217,60.217,0,0,0-7.952-3.208,19.139,19.139,0,0,1-37.118,0,60.254,60.254,0,0,0-7.952,3.208,19.142,19.142,0,0,1-26.856,25.914,60.232,60.232,0,0,0-3.583,8.1A19.239,19.239,0,0,1,96.3,136.825a19.017,19.017,0,0,1-16.388,18.941,60.194,60.194,0,0,0,3.392,8.757,19.139,19.139,0,0,1,30.766,15.2,18.993,18.993,0,0,1-4.376,12.183,60.2,60.2,0,0,0,9.072,3.864A19.168,19.168,0,0,1,137.828,178.355Z"
                transform="translate(-75.846 -76.786)"
                fill="#fff"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className="amount mb-1">Settings</div>
      <div
        style={{ maxWidth: "500px" }}
        className="container settingsContainer mt-4"
      >
        <div className="row text-center">
          <div className="col-6">
            <MDBBtn
              onClick={() => {
                clearFields();
                setPasswordChanged(false);
                setTab("Password");
              }}
              className={tab === "Password" ? "btnMain active" : "btnMain "}
            >
              change password
            </MDBBtn>
          </div>

          <div className="col-6">
            <MDBBtn
              onClick={() => {
                clearFields();
                setPasswordChanged(false);
                setTab("Keys");
              }}
              className={tab === "Keys" ? "btnMain active" : "btnMain"}
            >
              show private keys
            </MDBBtn>
          </div>
        </div>
        {tab === "Password" ? changePasswordTab() : getKeysTab()}
      </div>

      <div className="transactionsList"></div>
    </div>
  );
}

export default index;
