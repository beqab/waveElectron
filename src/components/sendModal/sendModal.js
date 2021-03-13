import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBAutocomplete,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdbreact";
import Logo from "../../imgs/logo.png";
import axios from "axios";
import ModalHead from "../../imgs/moadlHeder.png";

const ModalPage = ({ modal14, toggle, account, reloadData }) => {
  const [sendTo, setSendTo] = useState("");
  const [serverError, setServerError] = useState("");
  const [amount, setAmount] = useState("");
  const [amountUsd, setAmountUsd] = useState("");
  //   state = {
  //     modal14: false,
  //   };

  useEffect(() => {
    return () => {
      setServerError("");
    };
  }, []);

  const sendWave = () => {
    console.log(account);
    // debugger;
    axios
      .post(
        "http://51.255.211.135:8181/wallet/transact",
        {
          to: sendTo,
          amount: Number(amount),
          type: "transaction",
        },
        {
          headers: {
            account: account,
          },
        }
      )
      .then((res) => {
        reloadData();
        setSendTo("");
        setAmount(0);

        toggle(null);
      })
      .catch((err) => {
        console.log("errrrrrrrrrr", err.response);
        // debugger;
        if (err?.response?.data?.message) {
          setServerError(err?.response?.data?.message);
        }
      });
  };

  return (
    <MDBContainer className="MainModalWrapper  w650">
      <MDBModal
        isOpen={modal14}
        toggle={() => {
          setServerError("");
          toggle(null);
        }}
        centered
      >
        <MDBModalHeader
          className="text-center addressModal"
          toggle={() => toggle(null)}
        >
          <img className="w-100" src={ModalHead} />
          <h3 className="modalTitle">Send WAVE</h3>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol
              md="9"
              lg="10"
              xl="5"
              className="mx-auto mt-3 sendContainer"
            >
              <MDBCardBody className="mx-4">
                <div className="row text-left">
                  <div className="col-6">
                    <div>
                      {" "}
                      <b> Currency </b>
                    </div>
                    <input className="blueColor" value="WAVE" />
                  </div>
                  <div className="col-6">
                    <div>
                      {" "}
                      <b>From</b>{" "}
                    </div>
                    <input className="blueColor" value="my adress" />
                  </div>
                </div>
                <MDBInput
                  clear
                  label="Send to WAVE coin address "
                  group
                  type="email"
                  validate
                  error="text"
                  success="right"
                  value={sendTo}
                  onChange={(e) => {
                    console.log(e);
                    setSendTo(e.target.value);
                    setServerError("");

                    // debugger;
                  }}
                />

                <div className="row text-left">
                  <div className="col-6">
                    <div className=" currencyField">
                      <MDBInput
                        value={amountUsd}
                        onChange={(e) => {
                          setAmountUsd(e.target.value);
                          setAmount(Math.ceil(e.target.value / 2).toFixed(3));

                          setServerError("");
                        }}
                        hint="0.00"
                        type="number"
                        className="mb-0"
                      />
                      <span
                        style={{ fontWeight: "normal" }}
                        className="labelCurr"
                      >
                        USD
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className=" currencyField">
                      <MDBInput
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setAmountUsd(
                            Math.ceil(e.target.value * 2).toFixed(2)
                          );

                          setServerError("");
                        }}
                        hint="0.00"
                        type="number"
                        className="mb-0"
                      />
                      <span
                        style={{ fontWeight: "normal" }}
                        className="labelCurr"
                      >
                        WAVE
                      </span>
                    </div>
                  </div>
                </div>

                <MDBInput
                  clear
                  label="Personal note (optional)"
                  group
                  type="textarea"
                  validate
                  containerClass="mb-0"
                />
                {/* <div className=" currencyField">
                  <MDBInput
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setServerError("");
                    }}
                    hint="0.00"
                    type="number"
                  />
                  <span className="labelCurr">Wave</span>
                </div> */}
                {serverError && (
                  <span style={{ color: "red" }}>{serverError}</span>
                )}

                <div
                  style={{ fontSize: "12px" }}
                  className="text-right  blueColor mt-5 display-inline-block"
                >
                  <span>
                    Network Fee{" "}
                    <span
                      className="p-2"
                      style={{
                        color: "grey",
                        border: "1px solid #0a3b89 ",
                        borderRadius: "9px",
                      }}
                    >
                      0 WAVE ($0.00)
                    </span>
                  </span>
                </div>

                <div className="text-left pt-3 mb-3 text-left">
                  <span style={{ fontSize: "12px", color: "grey" }}>
                    Estimated confirmation time 1+ hour
                  </span>
                  <MDBBtn
                    type="button"
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                    onClick={() => {
                      sendWave();
                    }}
                  >
                    Send
                  </MDBBtn>
                </div>
                {/* <p className="dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                    {" "}
                    or Sign up with:
                  </p> */}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
        {/* <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => toggle(null)}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter> */}
      </MDBModal>
    </MDBContainer>
  );
};

export default ModalPage;
