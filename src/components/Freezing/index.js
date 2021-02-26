import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

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
import Wave from "../../imgs/logo.png";
import Modal from "../sendModal/sendModal";
import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
import { getSelectedWallet } from "../helpers";

function index({ account }) {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const { userKey } = React.useContext(WalletKeyContext);

  useEffect(() => {
    fetchWalletData();
    // validators
    axios.get(
      "http://51.255.211.135:8181/freezes",

      {
        headers: {
          account: account,
        },
      }
    );
  }, []);

  const fetchWalletData = () => {
    axios
      .get(
        "http://51.255.211.135:8181/wallet/" + getSelectedWallet(userKey).key
      )
      .then((res) => {
        // debugger;

        setBalance(res.data.wallet);
        // debugger;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const freezeWave = () => {
    console.log(account);
    // debugger;
    axios
      .post(
        "http://51.255.211.135:8181/wallet/freeze",
        {
          to:
            "0512d818771130abf35543032887fe2ae9677379c013126e1f092b366ad3391a",
          // to: balance.pubKey,
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
        // debugger;
        setOpenModal(null);
        fetchWalletData();
      });
  };

  const unfreezeWave = () => {
    console.log(account);
    // debugger;
    axios
      .post(
        "http://51.255.211.135:8181/wallet/unfreeze",
        {
          // to: balance.pubKey,
          to:
            "0512d818771130abf35543032887fe2ae9677379c013126e1f092b366ad3391a",
          amount: Number(amount),
          type: "freeze",
        },
        {
          headers: {
            account: account,
          },
        }
      )
      .then((res) => {
        // debugger;
        setOpenModal(null);
        fetchWalletData();
      });
  };

  return (
    <div className="wave-main">
      <MDBContainer className="MainModalWrapper">
        <MDBModal isOpen={openModal} toggle={() => setOpenModal(null)} centered>
          <MDBModalHeader
            className="text-center"
            toggle={() => setOpenModal(null)}
          >
            <img src={Logo} width="60" />
          </MDBModalHeader>
          <MDBModalBody>
            <div className="amount mt-0 mb-1">Freeze WAVE</div>

            <MDBRow>
              <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <div className=" currencyField">
                      <MDBInput
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        hint="Amount"
                        type="number"
                      />
                      <span className="labelCurr">WAVE</span>
                    </div>

                    <div className="text-center pt-3 mb-3">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        onClick={() => {
                          if (openModal === "freeze") {
                            freezeWave();
                          } else {
                            unfreezeWave();
                          }
                        }}
                      >
                        {openModal === "freeze" ? "FREEZE" : "UNFREEZE"}
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

      <div className="">
        <img width="90" src={Wave} />
      </div>
      <div className="amount mb-1">Unfreeze WAVE</div>
      <div className="mb-5" style={{ color: "#C3EEFD", fontWeight: "bold" }}>
        +25% Yearly yield
      </div>

      <div className="transactionsList">
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Available</div>
          <div className="right">{balance?.balance} WAVE</div>
        </div>
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Freezed</div>
          <div className="right">{balance?.blocked} WAE</div>
        </div>

        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Total balance</div>
          <div className="right">{balance?.balance + balance?.blocked} WAE</div>
        </div>
      </div>

      <div className="btn-group walletBtn mt-5">
        <MDBBtn
          onClick={() => setOpenModal("unfreeze")}
          className="mx-3 btnMain bold textCapital"
        >
          UNFREEZE
        </MDBBtn>
        <MDBBtn
          onClick={() => setOpenModal("freeze")}
          className="mx-3 btnMain bold textCapital"
        >
          FREEZE
        </MDBBtn>

        {/* 
        <MDBBtn
          className="mx-3"
          tag="a"
          size="lg"
          gradient="blue"
          floating
          rounded
        >
          <MDBIcon icon="exchange-alt" />
        </MDBBtn> */}
      </div>
    </div>
  );
}

export default index;
