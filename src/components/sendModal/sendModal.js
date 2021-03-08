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

const ModalPage = ({ modal14, toggle, account, reloadData }) => {
  const [sendTo, setSendTo] = useState("");
  const [serverError, setServerError] = useState("");
  const [amount, setAmount] = useState(0);
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
    <MDBContainer className="MainModalWrapper">
      <MDBModal
        isOpen={modal14}
        toggle={() => {
          setServerError("");
          toggle(null);
        }}
        centered
      >
        <MDBModalHeader className="text-center" toggle={() => toggle(null)}>
          <img src={Logo} width="60" />
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <MDBInput
                    clear
                    label="Send to Wave coin address"
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

                  <MDBInput
                    clear
                    label="Personal note (optional)"
                    group
                    type="text"
                    validate
                    containerClass="mb-0"
                  />
                  <div className=" currencyField">
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
                  </div>
                  {serverError && (
                    <span style={{ color: "red" }}>{serverError}</span>
                  )}

                  <div className="text-center pt-3 mb-3">
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
              </MDBCard>
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
