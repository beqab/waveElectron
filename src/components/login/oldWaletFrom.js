import React, { useState } from "react";
import { MDBBtn, MDBInput } from "mdbreact";

import { WalletKeyContext } from "../walletKeyContext/walletKeyContext";
import axios from "axios";
const { ipcRenderer } = require("electron");

const oldWaletFrom = ({ changeContent }) => {
  const { setUserKey } = React.useContext(WalletKeyContext);
  const [accountName, setAccountName] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [modalStep, setModalStep] = useState("import");

  const [words, setWords] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const signIngHandler = () => {
    // debugger;
    axios
      .post("http://51.255.211.135:8181/wallet/sign-in", {
        secret: words.join(" "),
      })
      .then((res) => {
        console.log(res);
        if (res?.data?.pubKey) {
          ipcRenderer.send("create", {
            wallet: words.join(" "),
            key: res.data.pubKey,
            privateKey: res.data.privKey,
            accountName,
          });
          ipcRenderer.send("changeAccount", {
            name: accountName,
          });
          setUserKey({
            wallet: words.join(" "),
            key: res.data.pubKey,
            accountName,
          });
        } else {
          alert("Wallet not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center w-100">
      <form className="my-5 mx-md-10" action="">
        <div className="">
          <div className="col-md-12 mx-auto">
            <div style={{ boxShadow: "none " }} className="">
              {modalStep === "set_account_name" ? (
                <div className="card-body">
                  <div className="text-left">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setModalStep("import");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.608"
                        height="35.445"
                        viewBox="0 0 42.608 35.445"
                      >
                        <g
                          id="Group_91"
                          data-name="Group 91"
                          transform="translate(-1363.867 -348.544)"
                        >
                          <line
                            id="Line_51"
                            data-name="Line 51"
                            x1="38.272"
                            transform="translate(1366.703 366.21)"
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-width="3"
                          />
                          <path
                            id="Path_176"
                            data-name="Path 176"
                            d="M6013.589-1112.334l-15.6,15.6,15.6,15.6"
                            transform="translate(-4632 1463)"
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-width="3"
                          />
                        </g>
                      </svg>
                      {/* <i class="fas fa-backward"></i> go back */}
                    </span>
                  </div>

                  <form
                    className="text-center"
                    style={{ color: "#757575" }}
                    action="#!"
                  >
                    <h3 className="font-weight-bold my-2 pb-2 text-center dark-grey-text">
                      Create New Wallet
                    </h3>

                    <input
                      placeholder="Add newInput Account Name"
                      onChange={(e) => {
                        setAccountName(e.target.value);
                        setAccountNameError("");
                      }}
                      className="form-control mb-0"
                      // outline
                      required
                      // size="sm"
                    />
                    {accountNameError && (
                      <div
                        style={{
                          color: "red",
                          marginTop: "-23px",
                          textAlign: "left",
                          marginBottom: "20px",
                        }}
                      >
                        {" "}
                        {accountNameError}{" "}
                      </div>
                    )}
                    {/* <div className="invalid-feedback"></div> */}

                    {/* <textarea value={words} className="wordsContainer"></textarea> */}
                    <div>
                      <MDBBtn
                        onClick={() => {
                          if (!accountName) {
                            return setAccountNameError(
                              "Account name is require"
                            );
                          }

                          signIngHandler();
                        }}
                        color="light-green newInput1212 btnMain w-75"
                      >
                        sing in
                      </MDBBtn>
                    </div>
                    <div className="text-center"></div>
                  </form>
                </div>
              ) : (
                <div className="">
                  <div className="text-left">
                    <span
                      className="cursor-pointer"
                      onClick={() => changeContent("Welcome")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.608"
                        height="35.445"
                        viewBox="0 0 42.608 35.445"
                      >
                        <g
                          id="Group_91"
                          data-name="Group 91"
                          transform="translate(-1363.867 -348.544)"
                        >
                          <line
                            id="Line_51"
                            data-name="Line 51"
                            x1="38.272"
                            transform="translate(1366.703 366.21)"
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-width="3"
                          />
                          <path
                            id="Path_176"
                            data-name="Path 176"
                            d="M6013.589-1112.334l-15.6,15.6,15.6,15.6"
                            transform="translate(-4632 1463)"
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-width="3"
                          />
                        </g>
                      </svg>
                      {/* <i class="fas fa-backward"></i> go back */}
                    </span>
                  </div>

                  <form
                    className="text-center"
                    style={{ color: "#fff" }}
                    action="#!"
                  >
                    <h3 className="font-weight-bold my-4 pb-2 text-center dark-grey-text">
                      ENTER MNEMONICS (12 WORDS)
                    </h3>
                    <label>WORDS:</label>
                    <div className="mnemonicContainer">
                      {words.map((el, i) => {
                        return (
                          <div>
                            <span>{i + 1}</span>
                            <input
                              value={el}
                              key={i}
                              onChange={(e) => {
                                let NewWords = words.map((word, index) => {
                                  // debugger;
                                  if (i === index) {
                                    return e.target.value;
                                  } else {
                                    return word;
                                  }
                                });
                                setWords([...NewWords]);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <small
                      id="passwordHelpBlock"
                      className="form-text text-right blue-text"
                    ></small>

                    <div className="text-center">
                      <button
                        onClick={() => {
                          if (words.filter((el) => el === "").length) {
                            return;
                          }
                          setModalStep("set_account_name");
                        }}
                        type="button"
                        className="btn btn-default btnMain btnWithFrame  btn-rounded my-4 waves-effect"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default oldWaletFrom;
