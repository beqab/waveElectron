import React, { useState } from "react";
import { MDBBtn } from "mdbreact";

const oldWaletFrom = ({ changeContent }) => {
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
                      type="button"
                      className="btn btn-default btnMain  btn-rounded my-4 waves-effect"
                    >
                      submit
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
