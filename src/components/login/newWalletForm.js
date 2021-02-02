import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdbreact";
const { ipcRenderer } = require("electron");
import { WalletKeyContext } from "../walletKeyContext/walletKeyContext";
import axios from "axios";
const mnemonicWords = require("mnemonic-words");

const newWalletForm = ({ changeContent }) => {
  const [words, setWords] = useState("");
  const [wordsError, setWordsError] = useState("");

  useEffect(() => {});

  const { setUserKey } = React.useContext(WalletKeyContext);
  const createKey = () => {
    if (!words) {
      setWordsError("at first generate mnemonicWords (24 Words)");
    }
    {
      ipcRenderer.send("create", {
        wallet: "123test",
        key: "456testKey",
      });
      setUserKey({
        wallet: "123test",
        key: "456testKey",
      });
    }

    // axios
    //   .post("/wallet/create")
    //   .then((res) => {
    //     console.log("mhhh");
    //   })
    //   .catch((err) => {
    //     console.log(err, "errr");
    //   });
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
                    crete new Wallet
                  </h3>

                  <textarea value={words} className="wordsContainer"></textarea>

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
                        setWords(mnemonicWords);
                        setWordsError("");
                      }}
                      color="light-green btnMain w-75"
                    >
                      IMPORT FROM MNEMONICS (24 WORDS)
                    </MDBBtn>

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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default newWalletForm;
