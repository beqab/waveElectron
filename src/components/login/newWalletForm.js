import React, { useState, useEffect } from "react";
import { MDBBtn, MDBInput } from "mdbreact";
const { ipcRenderer } = require("electron");
import { WalletKeyContext } from "../walletKeyContext/walletKeyContext";
const HttpsProxyAgent = require("https-proxy-agent");
import axios from "axios";
const mnemonicWords = require("mnemonic-words");

// const axiosDefaultConfig = {
//   baseURL: "http://51.255.211.135:8181",
//   proxy: false,
//   httpsAgent: new HttpsProxyAgent("http://localhost:8080"),
// };

// const axios = require("axios").create(axiosDefaultConfig);
// const customAxiosInstance = axios.create({
//   baseURL: "http://51.255.211.135:8181",
// });

const modalSteps = {
  CREATE: "create",
  CREATED: "created",
  SET_ACCOUNT_NAME: "set_account_name",
  CONFIRM: "CONFIRM",
};

const newWalletForm = ({ changeContent, fromAccount }) => {
  // const [words, setWords] = useState("");
  const [wordsError, setWordsError] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [words, setWords] = useState([]);
  const [privateKey, getPrivateKey] = useState("");
  const [newWallet, setNewWallet] = useState(null);
  const [modalStep, setModalStep] = useState(modalSteps.CREATE);

  const val = React.useContext(WalletKeyContext);
  // debugger;

  useEffect(() => {});

  const { setUserKey } = React.useContext(WalletKeyContext);
  const createKey = () => {
    if (!words) {
      setWordsError("at first generate mnemonicWords (24 Words)");
    } else {
      axios
        .post(
          "http://51.255.211.135:8181/wallet/create"
          // {
          //   secret: words.slice(0, 26).join(" "),
          // }
          // {
          //   // proxy: {
          //   //   host: "http://51.255.211.135",
          //   //   port: 8181,
          //   // },
          //   header: {
          //     "Access-Control-Allow-Origin": "*",
          //   },
          // }
        )
        .then((res) => {
          console.log("mhhh");
          // debugger;
          setWords(res.data.phrases.split(" "));
          getPrivateKey(res.data.privKey);
          setNewWallet(res.data);
          setModalStep(modalSteps.CREATED);
        })
        .catch((err) => {
          console.log(err, "errr");
        });
    }
  };

  const signIngHandler = () => {
    axios
      .post("http://51.255.211.135:8181/wallet/sign-in", {
        secret: words.join(" "),
      })
      .then((res) => {
        console.log(res);

        ipcRenderer.send("create", {
          wallet: words.join(" "),
          key: res.data.pubKey,
          privateKey,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetModalContent = (type = null) => {
    if (type === modalSteps.CREATE) {
      return (
        <div className="card-body">
          {!fromAccount && (
            <div className="text-left">
              <span
                className="cursor-pointer"
                onClick={() => changeContent("Welcome")}
              >
                <i class="fas fa-backward"></i> go back11
              </span>
            </div>
          )}

          <form
            className="text-center"
            style={{ color: "#757575" }}
            action="#!"
          >
            <h3 className="font-weight-bold my-2 pb-2 text-center dark-grey-text">
              Create New Wallet
            </h3>

            {/* <textarea value={words} className="wordsContainer"></textarea> */}

            <div>
              <MDBBtn
                // onClick={() => {
                //   ipcRenderer.send("create", {
                //     wallet: "123test",
                //     key: "456testKey",
                //   });
                //   setUserKey({
                //     wallet: "123test",
                //     key: "456testKey",
                //   });
                // }}
                onClick={createKey}
                color="light-green btnMain w-75"
              >
                CREATE A NEW PRIVATE KEY
              </MDBBtn>
            </div>

            <div className="text-center"></div>
          </form>
        </div>
      );
    } else if (type === modalSteps.CREATED) {
      return (
        <div className="card-body">
          <div className="text-left">
            <span
              className="cursor-pointer"
              onClick={() => {
                setModalStep(modalSteps.CREATE);
              }}
            >
              <i class="fas fa-backward"></i> go back
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

            {/* <textarea value={words} className="wordsContainer"></textarea> */}
            <div className="mnemonicContainer">
              {words.map((el, i) => {
                return (
                  <div>
                    <span>{i + 1}</span>
                    <input
                      value={el}
                      key={i}
                      onChange={(e) => {
                        return;
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
            <div>
              {wordsError && (
                <div style={{ color: "red", textAlign: "center" }}>
                  {" "}
                  {wordsError}{" "}
                </div>
              )}
              <MDBBtn
                onClick={() => {
                  setModalStep(modalSteps.SET_ACCOUNT_NAME);
                }}
                color="light-green btnMain w-75"
              >
                Next
              </MDBBtn>
            </div>

            <div className="text-center"></div>
          </form>
        </div>
      );
    } else if (type === modalSteps.SET_ACCOUNT_NAME) {
      return (
        <div className="card-body">
          <div className="text-left">
            <span
              className="cursor-pointer"
              onClick={() => {
                setModalStep(modalSteps.CREATED);
              }}
            >
              <i class="fas fa-backward"></i> go back
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

            <MDBInput
              label="Add Account Name"
              onChange={(e) => {
                setAccountName(e.target.value);
                setAccountNameError("");
              }}
              className="form-control mb-0"
              outline
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
              {newWallet && (
                <MDBBtn
                  onClick={() => {
                    if (!accountName) {
                      return setAccountNameError("Account name is require");
                    }

                    return setModalStep(modalSteps.CONFIRM);
                  }}
                  color="light-green btnMain w-75"
                >
                  Next
                </MDBBtn>
              )}
            </div>
            <div className="text-center"></div>
          </form>
        </div>
      );
    } else if (type === modalSteps.CONFIRM) {
      return (
        <div className="card-body">
          <div className="text-left">
            <span
              className="cursor-pointer"
              onClick={() => {
                setModalStep(modalSteps.CREATED);
              }}
            >
              <i class="fas fa-backward"></i> go back
            </span>
          </div>

          <form
            className="text-center"
            style={{ color: "#757575" }}
            action="#!"
          >
            <h3 className="font-weight-bold my-2 pb-2 text-center dark-grey-text">
              Wallet Created
            </h3>
            <hr />
            Your wallet has been created. <br />
            Keep your public/private keys and paraphrase safe
            {/* <div className="invalid-feedback"></div> */}
            {/* <textarea value={words} className="wordsContainer"></textarea> */}
            <div>
              {newWallet && (
                <MDBBtn
                  onClick={() => {
                    // ipcRenderer.send("exportKeys", {
                    //   pubKey: newWallet.pubKey,
                    //   privKey: newWallet.privKey,
                    //   phrases: newWallet.phrases,
                    // });
                    signIngHandler();
                  }}
                  color="light-green btnMain w-75"
                >
                  OK
                </MDBBtn>
              )}
            </div>
            <div className="text-center"></div>
          </form>
        </div>
      );
    }
  };
  return (
    <div>
      <form className="my-2 mx-md-10 newWoletContainer" action="">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <div style={{ boxShadow: "none " }} className="card">
              {GetModalContent(modalStep)}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default newWalletForm;
