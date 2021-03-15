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
import ModalHead from "../../imgs/moadlHeder.png";

function index({ account }) {
  const [balance, setBalance] = useState(null);
  const [rewarded, setRewarded] = useState(0);
  const [amount, setAmount] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const { userKey } = React.useContext(WalletKeyContext);
  const [serverError, setServerError] = useState("");

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

        let reward = 0;
        // debugger;
        const incoming = res.data.transactions.INCOMING.filter((el) => {
          // if (sum.output.amount) {
          if (
            el.input.from ===
            "dc2152fd2bfe753c2a65af51c38c0c798cb101d1ac7bcdb906866fe2b7d07c3b"
          ) {
            return (reward += el.output.amount);
          } else {
            return false;
          }

          // }
        });

        setRewarded(reward.toFixed(4));

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
          // to:
          //   "0512d818771130abf35543032887fe2ae9677379c013126e1f092b366ad3391a",
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
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setServerError(err.response.data.message);
        }
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
          // to:
          //   "0512d818771130abf35543032887fe2ae9677379c013126e1f092b366ad3391a",
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
      <MDBContainer className="MainModalWrapper w650">
        <MDBModal isOpen={openModal} toggle={() => setOpenModal(null)} centered>
          <MDBModalHeader
            className="text-center addressModal"
            toggle={() => setOpenModal(null)}
          >
            <img className="w-100" src={ModalHead} />

            <h3>Freeze WAVE</h3>
          </MDBModalHeader>
          <MDBModalBody>
            {/* <div className="amount mt-0 mb-1">Freeze WAVE</div> */}

            <MDBRow>
              <MDBCol
                md="9"
                lg="10"
                xl="5"
                className="mx-auto mt-3 modalContainer"
              >
                <MDBCardBody className="mx-4">
                  {balance?.blocked && openModal === "freeze" ? (
                    <>
                      <div>
                        <div style={{ color: "#000" }}>
                          You have already freezed wave if you want to freeze
                          more UNFREEZE at first
                        </div>
                        <div className="text-venter">
                          <MDBBtn
                            onClick={() => setOpenModal("unfreeze")}
                            className="mx-3 btnMain bold textCapital"
                          >
                            UNFREEZE
                          </MDBBtn>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {openModal === "freeze" ? (
                        <div className=" currencyField">
                          <MDBInput
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                              setServerError("");
                            }}
                            hint="Amount"
                            type="number"
                          />
                          <span className="labelCurr">WAVE</span>
                        </div>
                      ) : (
                        <div style={{ color: "#000" }}>
                          Are you sure to unfreeze wave?
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
                    </>
                  )}
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

      <div className="">
        <img width="90" src={Wave} />
      </div>
      <div className="amount mb-1 mb-4">freeze WAVE</div>
      {/* <div className="mb-5" style={{ color: "#C3EEFD", fontWeight: "bold" }}>
        +25% Yearly yield
      </div> */}

      <div className="transactionsCards">
        <div>
          <span>Available</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64.102"
            height="77.001"
            viewBox="0 0 64.102 77.001"
          >
            <g
              id="Group_111"
              data-name="Group 111"
              transform="translate(-447.221 -2274.139)"
            >
              <g
                id="Group_109"
                data-name="Group 109"
                transform="translate(459.374 2274.139)"
              >
                <path
                  id="Path_196"
                  data-name="Path 196"
                  d="M502.281,2308.8l-16.393-16.393,2-2,14.393,14.393,30.665-30.665,2,2Z"
                  transform="translate(-485.888 -2274.139)"
                  fill="#fff"
                />
              </g>
              <g
                id="Group_110"
                data-name="Group 110"
                transform="translate(447.221 2295.522)"
              >
                <path
                  id="Path_197"
                  data-name="Path 197"
                  d="M522.3,2344.98c1.9-.148,3.879-.236,5.942-.258l2.356-2.535c-.458-.007-.918-.011-1.38-.011a89.7,89.7,0,0,0-9.162.459Z"
                  transform="translate(-497.162 -2342.176)"
                  fill="#fff"
                />
                <path
                  id="Path_198"
                  data-name="Path 198"
                  d="M511.323,2355.95c0-2.378-1.713-5.789-9.878-8.543a55.426,55.426,0,0,0-9.036-2.133l-2.138,2.253c11.291,1.479,18.514,5.1,18.514,8.422,0,1.723-1.941,3.528-5.385,5.071a33.184,33.184,0,0,1-3.706,1.375,79.579,79.579,0,0,1-40.844,0,33.1,33.1,0,0,1-3.7-1.375c-3.444-1.543-5.388-3.348-5.388-5.071,0-2.744,4.918-5.685,12.977-7.462l-2.088-2.114c-1.244.312-2.429.656-3.546,1.032-8.165,2.754-9.88,6.165-9.88,8.543v6.535a5.2,5.2,0,0,1,0,6.358v6.535a5.2,5.2,0,0,1,0,6.355v6.535a5.426,5.426,0,0,0,1.084,3.18,9.265,9.265,0,0,0,1.817,1.87,23.015,23.015,0,0,0,6.979,3.492c1.178.4,2.434.756,3.751,1.081a64.759,64.759,0,0,0,6.85,1.279,90.075,90.075,0,0,0,23.139,0,64.524,64.524,0,0,0,6.85-1.279c1.32-.325,2.576-.685,3.754-1.081a23.05,23.05,0,0,0,6.979-3.492,9.324,9.324,0,0,0,1.815-1.87,5.429,5.429,0,0,0,1.084-3.18v-6.535a5.2,5.2,0,0,1,0-6.355v-6.535a5.2,5.2,0,0,1,0-6.358Zm-2.538,32.319a2.758,2.758,0,0,1-.36,1.31,6.25,6.25,0,0,1-1.723,1.871c-2.84,2.172-8.436,4.134-15.86,5.167a87.991,87.991,0,0,1-23.139,0c-7.424-1.033-13.02-2.995-15.86-5.167a6.235,6.235,0,0,1-1.721-1.871,2.734,2.734,0,0,1-.363-1.31v-1.784a15.011,15.011,0,0,0,2.474,1.7,25.409,25.409,0,0,0,2.914,1.376c.607.244,1.254.485,1.954.721,5.942,2,13.814,3.106,22.172,3.106s16.23-1.1,22.172-3.106c.7-.236,1.345-.477,1.954-.721a25.6,25.6,0,0,0,2.913-1.376,14.953,14.953,0,0,0,2.472-1.7Zm-5.385-1.464a33.184,33.184,0,0,1-3.706,1.375,79.579,79.579,0,0,1-40.844,0,33.1,33.1,0,0,1-3.7-1.375c-3.444-1.543-5.388-3.345-5.388-5.071a2.724,2.724,0,0,1,.363-1.307,22.892,22.892,0,0,0,6.979,3.492c1.178.4,2.434.759,3.751,1.083a64.65,64.65,0,0,0,6.85,1.277,89.755,89.755,0,0,0,23.139,0,64.416,64.416,0,0,0,6.85-1.277c1.32-.325,2.576-.685,3.754-1.083a22.926,22.926,0,0,0,6.979-3.492,2.747,2.747,0,0,1,.36,1.307C508.785,2383.46,506.844,2385.262,503.4,2386.805Zm5.385-11.426a2.748,2.748,0,0,1-.36,1.307,6.222,6.222,0,0,1-1.723,1.871c-2.84,2.175-8.436,4.137-15.86,5.167a87.686,87.686,0,0,1-23.139,0c-7.424-1.03-13.02-2.992-15.86-5.167a6.206,6.206,0,0,1-1.721-1.871,2.724,2.724,0,0,1-.363-1.307v-1.787a14.862,14.862,0,0,0,2.474,1.7,24.926,24.926,0,0,0,2.914,1.375c.607.246,1.254.485,1.954.721,5.942,2,13.814,3.106,22.172,3.106s16.23-1.1,22.172-3.106c.7-.236,1.345-.475,1.954-.721a25.11,25.11,0,0,0,2.913-1.375,14.806,14.806,0,0,0,2.472-1.7Zm-5.385-1.467a32.245,32.245,0,0,1-3.706,1.375,79.579,79.579,0,0,1-40.844,0,32.169,32.169,0,0,1-3.7-1.375c-3.444-1.541-5.388-3.345-5.388-5.069a2.734,2.734,0,0,1,.363-1.31,22.937,22.937,0,0,0,6.979,3.5c1.178.4,2.434.756,3.751,1.081a65.323,65.323,0,0,0,6.85,1.279,90.075,90.075,0,0,0,23.139,0,65.084,65.084,0,0,0,6.85-1.279c1.32-.325,2.576-.685,3.754-1.081a22.972,22.972,0,0,0,6.979-3.5,2.758,2.758,0,0,1,.36,1.31C508.785,2370.567,506.844,2372.371,503.4,2373.912Zm5.385-11.426a2.74,2.74,0,0,1-.36,1.307,6.219,6.219,0,0,1-1.723,1.871c-2.84,2.175-8.436,4.137-15.86,5.17a87.963,87.963,0,0,1-23.139,0c-7.424-1.033-13.02-2.995-15.86-5.17a6.2,6.2,0,0,1-1.721-1.871,2.716,2.716,0,0,1-.363-1.307V2360.7a14.862,14.862,0,0,0,2.474,1.7,25.287,25.287,0,0,0,2.914,1.375c.607.244,1.254.485,1.954.721,5.942,2,13.814,3.106,22.172,3.106s16.23-1.1,22.172-3.106c.7-.236,1.345-.477,1.954-.721a25.477,25.477,0,0,0,2.913-1.375,14.806,14.806,0,0,0,2.472-1.7Z"
                  transform="translate(-447.221 -2344.301)"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
          <span>{balance?.balance} WAVE</span>
        </div>
        <div>
          <span>Freezed</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="81.48"
            height="74.292"
            viewBox="0 0 81.48 74.292"
          >
            <g
              id="Group_108"
              data-name="Group 108"
              transform="translate(-920.719 -2254.976)"
            >
              <path
                id="Path_190"
                data-name="Path 190"
                d="M1044.482,2366.209c-6.906-2.243-7.518,2.814-12.848,3.074C1038.257,2370.343,1037.122,2366.029,1044.482,2366.209Z"
                transform="translate(-84.002 -83.809)"
                fill="#fff"
              />
              <path
                id="Path_191"
                data-name="Path 191"
                d="M1048.477,2372.964c3.839.355,4.245-2.05,8.532-2.861C1052.768,2369.869,1051.261,2372.31,1048.477,2372.964Z"
                transform="translate(-96.758 -87.179)"
                fill="#fff"
              />
              <path
                id="Path_192"
                data-name="Path 192"
                d="M1019.985,2351.561a4.375,4.375,0,0,0,1.2-.285,3.816,3.816,0,1,1,1.4-7.2,4.349,4.349,0,1,0-2.6,7.48Z"
                transform="translate(-71.587 -66.574)"
                fill="#fff"
              />
              <path
                id="Path_193"
                data-name="Path 193"
                d="M1025.667,2351.953a3.329,3.329,0,0,0,3.892,3.637,2.92,2.92,0,1,1,2.142-5.186,3.328,3.328,0,0,0-6.035,1.549Z"
                transform="translate(-79.468 -71.197)"
                fill="#fff"
              />
              <path
                id="Path_194"
                data-name="Path 194"
                d="M1034.8,2356.62a2.42,2.42,0,0,0,2.026,3.3,2.125,2.125,0,1,1,2.506-3.222,2.421,2.421,0,0,0-4.532-.081Z"
                transform="translate(-86.27 -75.822)"
                fill="#fff"
              />
              <path
                id="Path_195"
                data-name="Path 195"
                d="M1002.2,2264.31c0-1.905-1.373-4.638-7.914-6.845a64.637,64.637,0,0,0-35.53,0c-6.542,2.207-7.916,4.939-7.916,6.845v5.14a12.077,12.077,0,0,0-11.193,14.379H924.6a3.887,3.887,0,0,0-3.882,3.883V2325.8a3.476,3.476,0,0,0,3.472,3.472h52.358a.971.971,0,0,0,.971-.964c0-.036.014-1.885.032-4.734h3.982a.971.971,0,0,0,.971-.97v-23.305c1.12-.093,2.218-.21,3.286-.353a51.734,51.734,0,0,0,5.489-1.025c1.057-.26,2.064-.549,3.008-.866a18.473,18.473,0,0,0,5.592-2.8,7.472,7.472,0,0,0,1.454-1.5,4.347,4.347,0,0,0,.868-2.548v-5.236a4.166,4.166,0,0,1,0-5.092v-5.237a4.17,4.17,0,0,1,0-5.094Zm-57.866,10.028a10.152,10.152,0,1,1,13.251,15.314H945.439a10.153,10.153,0,0,1-1.106-15.314Zm27.578,9.491h-8.533c.069-.358.117-.72.154-1.082A60.968,60.968,0,0,0,971.912,2283.829Zm-47.31,1.941H940.2a12,12,0,0,0,2.37,3.883H924.6a1.941,1.941,0,0,1,0-3.883Zm50.983,41.557H924.191a1.532,1.532,0,0,1-1.53-1.53v-34.728a3.855,3.855,0,0,0,1.941.525h51.042c.034,1.246.066,4.288.055,11.48H963.852a3.887,3.887,0,0,0-3.882,3.882v2.669a3.887,3.887,0,0,0,3.882,3.882h11.812C975.637,2319.605,975.6,2325.158,975.585,2327.327Zm4.977-5.7h-3c.014-2.37.03-5.181.043-8.121h2.956Zm0-10.062h-16.71a1.943,1.943,0,0,1-1.941-1.941v-2.669a1.943,1.943,0,0,1,1.941-1.941h16.71Zm0-8.493h-2.923c.005-3.475,0-6.26-.013-8.294-.009-1.325-.022-2.349-.039-3.045-.031-1.295-.045-1.831-.765-2.043a.964.964,0,0,0-.274-.039h-16.09a12,12,0,0,0,2.37-3.883h17.733Zm19.6-12.869a2.207,2.207,0,0,1-.289,1.05,5,5,0,0,1-1.381,1.5c-2.276,1.74-6.76,3.313-12.708,4.14q-1.576.219-3.286.365v-3.2a50.733,50.733,0,0,0,11.782-2.245c.559-.189,1.078-.382,1.566-.577a20.424,20.424,0,0,0,2.335-1.1,12.03,12.03,0,0,0,1.98-1.359Zm-4.315-1.173a26.689,26.689,0,0,1-2.969,1.1,50.09,50.09,0,0,1-10.379,1.886v-3.054c1.12-.093,2.218-.211,3.286-.355a51.682,51.682,0,0,0,5.489-1.023c1.057-.26,2.064-.549,3.008-.868a18.378,18.378,0,0,0,5.592-2.8,2.2,2.2,0,0,1,.289,1.047C1000.166,2286.352,998.61,2287.8,995.851,2289.032Zm4.315-9.155a2.2,2.2,0,0,1-.289,1.047,4.973,4.973,0,0,1-1.381,1.5c-2.276,1.743-6.76,3.315-12.708,4.14q-1.576.219-3.286.366V2284.8a.971.971,0,0,0-.971-.971h-.419a52.456,52.456,0,0,0,13.172-2.346c.559-.189,1.078-.381,1.566-.578a20.139,20.139,0,0,0,2.335-1.1,11.867,11.867,0,0,0,1.98-1.358Zm-4.315-1.176a25.8,25.8,0,0,1-2.969,1.1,56.956,56.956,0,0,1-16.362,2.135,62.79,62.79,0,0,1-12.954-1.258,12.133,12.133,0,0,0-.644-3.156c1.373.3,2.82.553,4.326.757a72.189,72.189,0,0,0,18.54,0,52.294,52.294,0,0,0,5.489-1.025c1.057-.26,2.064-.549,3.008-.866a18.413,18.413,0,0,0,5.592-2.8,2.208,2.208,0,0,1,.289,1.05C1000.166,2276.021,998.61,2277.467,995.851,2278.7Zm4.315-9.155a2.194,2.194,0,0,1-.289,1.047,4.976,4.976,0,0,1-1.381,1.5c-2.276,1.743-6.76,3.314-12.708,4.142a70.5,70.5,0,0,1-18.54,0,48.464,48.464,0,0,1-5.446-1.062,12.033,12.033,0,0,0-8.931-5.664v-1.394a11.886,11.886,0,0,0,1.983,1.361,20.289,20.289,0,0,0,2.334,1.1c.486.2,1,.388,1.566.577a64.637,64.637,0,0,0,35.53,0c.559-.189,1.078-.382,1.566-.577a20.466,20.466,0,0,0,2.335-1.1,11.867,11.867,0,0,0,1.98-1.361Zm-4.315-1.173a26.5,26.5,0,0,1-2.969,1.1,63.763,63.763,0,0,1-32.726,0,26.48,26.48,0,0,1-2.967-1.1c-2.759-1.236-4.317-2.682-4.317-4.063,0-3.453,9.712-7.3,23.648-7.3s23.646,3.847,23.646,7.3C1000.166,2265.691,998.61,2267.137,995.851,2268.373Z"
                transform="translate(0)"
                fill="#fff"
              />
            </g>
          </svg>
          <span>{balance?.blocked} WAVE</span>
        </div>
        <div>
          <span>Total Rewarded </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72.58"
            height="78"
            viewBox="0 0 72.58 78"
          >
            <g
              id="Group_107"
              data-name="Group 107"
              transform="translate(-1488.593 -2245.146)"
            >
              <path
                id="Path_185"
                data-name="Path 185"
                d="M1604.859,2249.386a14.476,14.476,0,0,0-24.45,7.48,18.15,18.15,0,1,0,13.231,17.2,14.475,14.475,0,0,0,11.219-24.679Zm-29.362,41.274a16.323,16.323,0,1,1,16.324-16.323A16.323,16.323,0,0,1,1575.5,2290.661Zm19.124-18.012c-.357,0-.71-.015-1.06-.044a18.162,18.162,0,0,0-11.756-15.286,13.023,13.023,0,1,1,12.816,15.33Z"
                transform="translate(-51.514)"
                fill="#fff"
              />
              <path
                id="Path_186"
                data-name="Path 186"
                d="M1561.173,2443.66l-.49-.765a9.318,9.318,0,0,0-8.04-3.694c-4.864.091-10.654,6.642-12.206,8.508l-3.364.1-.011-3.242c-.007-2.127-.5-3.665-1.479-4.572a2.791,2.791,0,0,0-1.952-.8h-21.867l-8.429,6.111v-7.93h-14.742v29.791h14.742v-1.824l36.342-.19Zm-70.323-4.024h10.228v25.276H1490.85Zm12.485,23.452V2448.1l9.161-6.642h21.155l-.026.017.076-.014c.4.058,1.1.767,1.1,3.121l.011,3.3-14.834.462.07,2.256,21.49-.67.326-.407c1.775-2.221,7.179-8,10.818-8.067a7.493,7.493,0,0,1,5.513,1.985l-19.46,19.46Z"
                transform="translate(0 -144.024)"
                fill="#fff"
              />
              <g
                id="Group_106"
                data-name="Group 106"
                transform="translate(1513.954 2264.214)"
              >
                <path
                  id="Path_187"
                  data-name="Path 187"
                  d="M1603.632,2340.632a10.274,10.274,0,0,1-2.809.66,10.078,10.078,0,1,1,6.1-17.333,8.97,8.97,0,0,0-4.89-.941,8.843,8.843,0,1,0,1.6,17.613Z"
                  transform="translate(-1589.718 -2321.179)"
                  fill="#fff"
                />
                <path
                  id="Path_188"
                  data-name="Path 188"
                  d="M1622.448,2349.553a7.858,7.858,0,0,1-2.208.074,7.714,7.714,0,1,1,7.224-12.09,6.795,6.795,0,1,0-5.015,12.016Z"
                  transform="translate(-1607.377 -2330.97)"
                  fill="#fff"
                />
                <path
                  id="Path_189"
                  data-name="Path 189"
                  d="M1638.779,2359.754a5.708,5.708,0,0,1-1.563-.371,5.592,5.592,0,0,1-3.18-7.284,5.689,5.689,0,0,1,7.36-3.148,5.621,5.621,0,0,1,3.251,3.336,4.941,4.941,0,0,0-2.191-1.684,4.992,4.992,0,0,0-6.458,2.762A4.907,4.907,0,0,0,1638.779,2359.754Z"
                  transform="translate(-1622.621 -2341.689)"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
          <span>{rewarded ? rewarded : 0} WAVE</span>
        </div>
      </div>

      {/* <div className="transactionsList">
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
      </div> */}

      <div className="btn-group walletBtn mt-5">
        <MDBBtn
          onClick={() => setOpenModal("unfreeze")}
          className="mx-3 btnMain bold textCapital"
        >
          UNFREEZE
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setOpenModal("freeze");
          }}
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
      <h5 style={{ color: "#fff" }} className="text-left mt-4">
        How does freezing work on my wallet:
      </h5>
      <h6 style={{ color: "#fff" }} className="text-left">
        Your frozen WAVE coins will be added to our node and will be
        synchronized directly with it. After you froze your balance you will get
        your first rewards from ur freezing concept between the next 12-48h. If
        you decide to increase your frozen balance you have to cancel the
        freezing and re-freeze the new desired amount again.
      </h6>
    </div>
  );
}

export default index;
