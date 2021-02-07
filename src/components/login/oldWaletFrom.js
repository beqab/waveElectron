import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import { WalletKeyContext } from "../walletKeyContext/walletKeyContext";
import axios from "axios";
const { ipcRenderer } = require("electron");

const oldWaletFrom = ({ changeContent }) => {
  const { setUserKey } = React.useContext(WalletKeyContext);

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

        ipcRenderer.send("create", {
          wallet: "res.data.privKey",
          key: res.data.pubKey,
          secret: words.join(" "),
          balance: res.data.balance,
        });
        setUserKey({
          wallet: "res.data.privKey",
          key: res.data.pubKey,
          secret: words.join(" "),
          balance: res.data.balance,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center w-100">
      <form className="my-5 mx-md-10" action="">
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
                  {/* <input
                    type="test"
                    id="defaultSubscriptionFormPassword"
                    className="form-control mb-4"
                    placeholder="wallet address"
                  />
                  <label>private key</label>

                  <input
                    type="test"
                    id="defaultSubscriptionFormEmail"
                    className="form-control"
                    placeholder="key"
                  /> */}
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-right blue-text"
                  ></small>

                  <div className="text-center">
                    <button
                      onClick={() => {
                        signIngHandler();
                      }}
                      type="button"
                      className="btn btn-default btnMain  btn-rounded my-4 waves-effect"
                    >
                      SIGN INნ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default oldWaletFrom;
