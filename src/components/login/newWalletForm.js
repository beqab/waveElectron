import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdbreact";
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

const newWalletForm = ({ changeContent }) => {
  // const [words, setWords] = useState("");
  const [wordsError, setWordsError] = useState("");
  const [words, setWords] = useState([]);
  const [newWallet, setNewWallet] = useState(null);

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
          debugger;
          setWords(res.data.phrases.split(" "));
          setNewWallet(res.data);
          // ipcRenderer.send("create", {
          //   wallet: res.data.privKey,
          //   key: res.data.pubKey,
          // });
          // setUserKey({
          //   wallet: res.data.privKey,
          //   key: res.data.pubKey,
          // });
        })
        .catch((err) => {
          console.log(err, "errr");
        });
    }
  };
  return (
    <div>
      <form className="my-2 mx-md-10 newWoletContainer" action="">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <div style={{ boxShadow: "none " }} className="card">
              <div className="card-body">
                <div className="text-left">
                  <span
                    className="cursor-pointer"
                    onClick={() => changeContent("Welcome")}
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
                    Crete new Wallet
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
                  <div>
                    {wordsError && (
                      <div style={{ color: "red", textAlign: "center" }}>
                        {" "}
                        {wordsError}{" "}
                      </div>
                    )}

                    {newWallet && (
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
                        onClick={() => {
                          //  setWords(mnemonicWords);
                          //  setWordsError("");
                          console.log("singIn");
                        }}
                        color="light-green btnMain w-75"
                      >
                        Sign in
                      </MDBBtn>
                    )}

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
                  {newWallet && (
                    <>
                      <div className="walletInfo">
                        <div>
                          pubKey: <span> {newWallet.pubKey} </span>
                        </div>
                        <div>
                          privKey: <span> {newWallet.privKey} </span>
                        </div>
                        <div>
                          phrases: <span> {newWallet.phrases} </span>{" "}
                        </div>
                      </div>
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
                        onClick={() => {
                          // ipcRenderer.send("exportKeys", {
                          //   pubKey: newWallet.pubKey,
                          //   privKey: newWallet.privKey,
                          //   phrases: newWallet.phrases,
                          // });
                        }}
                        color="light-green btnMain w-75"
                      >
                        Export keys
                      </MDBBtn>
                    </>
                  )}
                  <div className="text-center"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default newWalletForm;
