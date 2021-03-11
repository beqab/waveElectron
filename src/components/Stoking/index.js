import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import img from "../../imgs/Group65.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const [pending, setPending] = useState(null);
  const [copied, setCopied] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(null);

  useEffect(() => {
    fetchWalletData();
    // axios.get(
    //   "http://51.255.211.135:8181/transactions",

    //   {
    //     headers: {
    //       account: account,
    //     },
    //   }
    // );
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
        let t = userKey?.wallets?.find(
          (el) => el.accountName === userKey.currentUser
        );
        // userKey;
        let validator = res.data.find((el) => el.address === t.key);

        if (validator && validator.amount) {
          axios
            .get(
              "http://51.255.211.135:8181/transactions/unfinished",

              {
                headers: {
                  account: account,
                },
              }
            )
            .then((st) => {
              const myPending = st.data.find(
                (item) =>
                  item.input.from === validator.address &&
                  (item.type.type === "validator" ||
                    item.type.type === "unstake")
              );
              debugger;
              if (myPending) {
                setPending(myPending);
                setStake(validator.amount - myPending.output.amount);
              } else {
                setStake(validator.amount);
                setPending(null);
              }
              // debugger;
              // debugger;
            });
        } else {
          setPending(null);
        }

        // res.data.forEach((element) => {
        //   // debugger;
        //   sum += element.amount;
        // });
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

      {pending ? (
        <>
          <div class="alert alert-warning mt-5" role="alert">
            pending {pending?.type?.type === "unstake" ? "unstake" : "stake"}{" "}
            {pending?.output?.amount} WAVE
          </div>
          <div className="transactionsList">
            {pending
              ? [1].map((ss, i) => {
                  let el = pending;
                  var d = new Date(el.input.timestamp);
                  const Month = d.getMonth();
                  let day = d.getDate();
                  if (day < 10) {
                    day = `0${day}`;
                  }

                  const time = new Date(el.input.timestamp);
                  return (
                    <div
                      onClick={() => {
                        setActiveIndex(i);
                        setAddress(el.txId);
                        setCopied(false);
                      }}
                      className="item d-flex justify-content-between "
                    >
                      <div
                        style={{ width: "200px", textAlign: "left" }}
                        className="left d-flex"
                      >
                        {/* <div className="date ">
                      {monthNames[Month]} <br />
                      {day}
                    </div> */}
                        <div>
                          <span
                            style={{ width: "64px", display: "inline-block" }}
                          >
                            <img
                              height="30"
                              style={{
                                marginBottom: "4px",
                                filter: "brightness(0) invert(1)",
                              }}
                              src="https://static.thenounproject.com/png/1768762-200.png"
                            />
                            {/* {el.type === "OUTGOING" ? (
                              <svg
                                className="mr-3"
                                xmlns="http://www.w3.org/2000/svg"
                                width="38"
                                viewBox="0 0 41.046 26.749"
                              >
                                <path
                                  id="Path_123"
                                  data-name="Path 123"
                                  d="M101.042,127.009a.565.565,0,0,0-.615-.139L60.513,142.326a.565.565,0,0,0,.1,1.084L71.71,145.4l2.591,7.792a.565.565,0,0,0,.968.186l5.459-6.463,10.329,1.96a.565.565,0,0,0,.621-.322l9.467-20.924A.566.566,0,0,0,101.042,127.009Zm-4.8,2.7L71.745,144.26,62.8,142.653ZM75.056,151.881l-2.3-6.908L93.7,132.531,78.113,145.479a.565.565,0,0,0,.256.99l1.085.206Zm15.776-4.2-11.074-2.1,19.269-16.01Z"
                                  transform="translate(-60.151 -126.833)"
                                  fill="#fff"
                                />
                              </svg>
                            ) : (
                              <img
                                height="30"
                                style={{ marginBottom: "4px" }}
                                src={img}
                              />
                            )} */}
                          </span>
                          <span>
                            {el.type === "OUTGOING" ? "- " : "+ "}{" "}
                            {el.output.amount}{" "}
                            <span
                              style={{
                                color: "#ffffff8c",
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              {" "}
                              Wave
                            </span>
                          </span>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === i
                            ? "middle transactionsMiddle text-left active "
                            : "middle transactionsMiddle text-left "
                        }
                      >
                        <div>
                          <div
                            style={{
                              color: "#ffffff8c",
                              fontSize: "12px",
                              lineHeight: "9px",
                            }}
                          >
                            {el.type === "OUTGOING" ? "To" : "From"}
                          </div>
                          <div className="address">
                            {" "}
                            {el.type === "OUTGOING"
                              ? el.output.to
                              : el.input.from}
                          </div>
                        </div>
                        <div
                          className={activeIndex === i ? "d-block" : "d-none"}
                        >
                          <div>
                            <div
                              style={{
                                color: "#ffffff8c",
                                fontSize: "12px",
                                lineHeight: "9px",
                              }}
                            >
                              {el.type === "OUTGOING" ? "From" : "To"}
                            </div>
                            <div className="address">
                              {" "}
                              {el.type === "OUTGOING"
                                ? el.input.from
                                : el.output.to}
                            </div>
                          </div>
                          <div>
                            <div
                              style={{
                                color: "#ffffff8c",
                                fontSize: "12px",
                                lineHeight: "9px",
                              }}
                            >
                              Hash
                            </div>
                            <div className="address">{el.txId}</div>
                          </div>

                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="text-center"
                          >
                            <CopyToClipboard
                              text={address}
                              onCopy={() => {
                                setCopied(true);
                              }}
                            >
                              <span
                                style={{ color: copied ? "green" : "#fff" }}
                                className="copy btn"
                              >
                                copy
                              </span>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>

                      <div style={{ minWidth: "100px", textAlign: "left" }}>
                        <div
                          style={{
                            color: "rgba(255, 255, 255, 0.55)",
                            fontSize: "12px",
                            lineHeight: "9px",
                            textAlign: "left",
                          }}
                        >
                          fee
                        </div>

                        <span>
                          {el.output.fee}{" "}
                          <span
                            style={{
                              color: "rgba(255, 255, 255, 0.55)",
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                          >
                            {" "}
                            Wave{" "}
                          </span>
                        </span>
                      </div>
                      <div
                        style={{
                          color: "#ffffff8c",
                          fontSize: "12px",
                          // lineHeight: "9px",
                        }}
                        className="right"
                      >
                        {" "}
                        {/* <Moment format="YYYY/MM/DD">{time}</Moment> */}
                        {time.getFullYear() +
                          "/" +
                          (time.getMonth() + 1) +
                          "/" +
                          time.getDate()}
                        <br />
                        {time.getHours() +
                          ":" +
                          time.getMinutes() +
                          ":" +
                          time.getSeconds()}
                        {/* <Moment format="HH:mm:ss ">{time}</Moment> */}
                      </div>
                    </div>
                  );
                })
              : "Transactions not found"}
          </div>
        </>
      ) : (
        <div className="btn-group walletBtn mt-5">
          {stake !== 0 && (
            <MDBBtn
              // onClick={() => setModal14(14)}
              onClick={() => setOpenModal("unstake")}
              className="mx-3 btnMain bold textCapital"
            >
              UNSTAKE
            </MDBBtn>
          )}

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
      )}
    </div>
  );
}

export default index;
