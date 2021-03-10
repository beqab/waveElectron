import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Modal from "../sendModal/sendModal";
import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
import Logo from "../../imgs/logo.png";
import Wave from "../../imgs/logo.png";
import { getSelectedWallet } from "../helpers";

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

function index({ account }) {
  const [balance, setBalance] = useState(null);
  const [stake, setStake] = useState(0);
  const [amount, setAmount] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const { userKey } = React.useContext(WalletKeyContext);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    fetchWalletData();
    axios.get(
      "http://51.255.211.135:8181/transactions",

      {
        headers: {
          account: account,
        },
      }
    );

    axios
      .get(
        "http://51.255.211.135:8181/validators",

        {
          headers: {
            account: account,
          },
        }
      )
      .then((res) => {
        let sum = 0;

        res.data.forEach((element) => {
          // debugger;
          sum += element.amount;
        });
        setStake(sum);
      });
  }, [userKey]);

  const fetchWalletData = () => {
    axios
      .get(
        "http://51.255.211.135:8181/wallet/" + getSelectedWallet(userKey).key
      )
      .then((res) => {
        // debugger;

        setBalance(res.data.wallet);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stakeWave = () => {
    console.log(account);
    // debugger;
    axios
      .post(
        "http://51.255.211.135:8181/wallet/transact",
        {
          // to: balance.pubKey,
          to:
            "0512d818771130abf35543032887fe2ae9677379c013126e1f092b366ad3391a",
          amount: Number(amount),
          type: "validator",
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
      })
      .catch((err) => {
        // debugger;
        if (err.response?.data?.message) {
          setServerError(err.response.data.message);
        }
      });
  };

  const unStakeWave = () => {
    axios
      .post(
        "http://51.255.211.135:8181/wallet/transact",
        {
          // to: balance.pubKey,
          to:
            "0512d818771130abf35543032887fe2ae9677379c013126e1f092b366ad3391a",
          amount: Number(amount),
          type: "unstake",
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
      })
      .catch((err) => {
        // debugger;
        if (err.response?.data?.message) {
          setServerError(err.response.data.message);
        }
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
            <div className="amount mt-0 mb-1">
              {openModal === "stake" ? "Stake " : "unstake "}
              WAVE
            </div>

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
                    {openModal === "stake" && (
                      <div className="d-flex justify-content-between">
                        <div style={{ color: "#000", textAlign: "left" }}>
                          <div>Available:</div>
                          <div>{balance?.balance} Wave</div>
                        </div>
                        <div>
                          <MDBBtn
                            onClick={() => {
                              setAmount(balance?.balance);
                            }}
                            className="mx-3 p-2 btnMain bold textCapital"
                          >
                            stake all
                          </MDBBtn>
                        </div>
                      </div>
                    )}
                    {serverError && (
                      <div style={{ color: "red" }}>{serverError}</div>
                    )}
                    <div className="text-center pt-3 mb-3">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        onClick={() => {
                          if (openModal === "stake") {
                            stakeWave();
                          } else {
                            unStakeWave();
                          }
                        }}
                      >
                        {openModal === "stake" ? "stake" : "unstake"}
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
      <div className="amount mb-1">Stake WAVE</div>
      <div className="mb-5" style={{ color: "#C3EEFD", fontWeight: "bold" }}>
        +25% Yearly yield
      </div>

      <div className="transactionsList">
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Available</div>
          <div className="right">{balance?.balance} WAVE</div>
        </div>
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Staked</div>
          <div className="right">{stake} WAVE</div>
        </div>

        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Rewards</div>
          <div className="right">{balance?.balance + stake} WAVE</div>
        </div>
      </div>

      <div className="btn-group walletBtn mt-5">
        <MDBBtn
          // onClick={() => setModal14(14)}
          onClick={() => setOpenModal("unstake")}
          className="mx-3 btnMain bold textCapital"
        >
          UNSTAKE
        </MDBBtn>
        <MDBBtn
          onClick={() => setOpenModal("stake")}
          className="mx-3 btnMain bold textCapital"
        >
          STAKE
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
