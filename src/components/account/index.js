import React from "react";

import Faq from "../../imgs/Gruppe75.png";
const { app, BrowserWindow } = require("electron");
const { ipcRenderer } = require("electron");
import NewWallet from "../login/newWalletForm";
import OldWallet from "../login/oldWaletFrom";
import ModalHead from "../../imgs/moadlHeder.png";

import {
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBModalHeader,
  MDBContainer,
  MDBModalBody,
  MDBRow,
  MDBModal,
  MDBCol,
} from "mdbreact";

const icon = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="check"
      width="20"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="svg-inline--fa fa-check fa-w-16 fa-2x mr-2"
    >
      <path
        fill="currentColor"
        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        class=""
      ></path>
    </svg>
  );
};

const shell = require("electron").shell;
import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";

function index() {
  const [openModal, setOpenModal] = React.useState(null);
  const [selectedAccount, setSelectedAccount] = React.useState(null);
  const [newName, setNewName] = React.useState("");

  const { userKey } = React.useContext(WalletKeyContext);

  const clear = () => {
    setOpenModal(false);
    setSelectedAccount("");
    setNewName("");
  };

  const modalContent = () => {
    if (openModal === "NewWallet") {
      return (
        <>
          <NewWallet fromAccount={true} />{" "}
        </>
      );
    } else if (openModal === "OldWallet") {
      return <OldWallet fromAccount={true} />;
    } else if (openModal === "delete") {
      return (
        <>
          <MDBModalHeader
            className="text-center addressModal"
            toggle={() => setOpenModal(null)}
          >
            <img className="w-100" src={ModalHead} />
            <h3 className="modalTitle">
              are you sure you want to delete the account : {selectedAccount} ?
            </h3>

            {/* <img src={Logo} width="60" /> */}
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol md="12" lg="12" xl="12" className="mx-auto mt-3">
                <MDBCardBody className="mx-4">
                  <div className="text-center row pt-3 mb-3">
                    <div className="col-6">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block  z-depth-1a"
                        onClick={() => {
                          clear();
                        }}
                      >
                        Cancel
                      </MDBBtn>
                    </div>
                    <div className="col-6">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        onClick={() => {
                          //   setOpenModal("edit");
                          ipcRenderer.send("deleteAccount", {
                            name: selectedAccount,
                          });
                          clear();
                        }}
                      >
                        Delete Account
                      </MDBBtn>
                    </div>
                  </div>
                  {/* <p className="dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                  {" "}
                  or Sign up with:
                </p> */}
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </>
      );
    } else {
      return (
        <>
          <MDBModalHeader
            className="text-center addressModal"
            toggle={() => setOpenModal(null)}
          >
            <img className="w-100" src={ModalHead} />
            <h3 className="modalTitle">Change Account name</h3>

            {/* <img src={Logo} width="60" /> */}
          </MDBModalHeader>
          <MDBModalBody>
            <div style={{ color: "#000" }} className="amount mt-0 mb-1">
              Account Name: {selectedAccount}
            </div>

            <MDBRow>
              <MDBCol md="12" lg="12" xl="12" className="mx-auto mt-3">
                <MDBCardBody className="mx-4">
                  <div className=" currencyField input">
                    <MDBInput
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                      label="Set New Account name"
                      // type="text"
                    />
                  </div>

                  <div className="text-center row pt-3 mb-3">
                    <div className="col-6">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        onClick={() => {
                          //   setOpenModal("edit");
                          ipcRenderer.send("changeAccountName", {
                            newName,
                            name: selectedAccount,
                          });
                          clear();
                        }}
                      >
                        Change Account Name
                      </MDBBtn>
                    </div>
                    <div className="col-6">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        onClick={() => {
                          clear();
                        }}
                      >
                        Cancel
                      </MDBBtn>
                    </div>
                  </div>
                  {/* <p className="dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
              {" "}
              or Sign up with:
            </p> */}
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </>
      );
    }
  };

  return (
    <div
      //  style={{ marginTop: "50px" }}

      className="wave-main"
    >
      <MDBContainer className="MainModalWrapper w650">
        <MDBModal isOpen={openModal} toggle={() => setOpenModal(null)} centered>
          {modalContent()}
          {/* <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => toggle(null)}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter> */}
        </MDBModal>
      </MDBContainer>
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="47.493"
          viewBox="0 0 27.493 30.592"
        >
          <g id="Group_64" data-name="Group 64" transform="translate(0)">
            <g
              id="Group_62"
              data-name="Group 62"
              transform="translate(0 16.355)"
            >
              <path
                id="Path_137"
                data-name="Path 137"
                d="M120.311,257.575H93.8a.489.489,0,0,1-.489-.489,13.747,13.747,0,1,1,27.493,0A.489.489,0,0,1,120.311,257.575ZM94.295,256.6h25.518a12.768,12.768,0,0,0-25.518,0Z"
                transform="translate(-93.307 -243.339)"
                fill="#fff"
              />
            </g>
            <g id="Group_63" data-name="Group 63" transform="translate(6.95)">
              <path
                id="Path_138"
                data-name="Path 138"
                d="M156.912,123.239a6.8,6.8,0,1,1,6.8-6.8A6.8,6.8,0,0,1,156.912,123.239Zm0-12.616a5.818,5.818,0,1,0,5.818,5.819A5.825,5.825,0,0,0,156.912,110.624Z"
                transform="translate(-150.115 -109.645)"
                fill="#fff"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className="amount mb-1">My Accounts: </div>

      <div
        style={{ maxWidth: "500px", color: "#fff" }}
        className="container settingsContainer mt-4"
      >
        <div className="accounts">
          {userKey?.wallets.map((el, i) => {
            return (
              <div className="p-2">
                <div className="accountItem py-2">
                  <span>
                    {el.accountName === userKey?.currentUser && icon()}
                    {el.accountName}
                  </span>{" "}
                  <br />
                  <MDBBtn
                    onClick={() => {
                      ipcRenderer.send("changeAccount", {
                        name: el.accountName,
                      });
                    }}
                    className="btnMain p-1 px-2"
                  >
                    set default
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => {
                      setOpenModal("edit");
                      setSelectedAccount(el.accountName);
                    }}
                    className="btnMain p-1 px-2"
                  >
                    Edit Account Name
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => {
                      setOpenModal("delete");
                      setSelectedAccount(el.accountName);
                    }}
                    className="btnMain p-1 px-2"
                  >
                    Delete Account
                  </MDBBtn>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row mt-5 accountBtns">
          <div className="col-6">
            <MDBBtn
              onClick={() => {
                setOpenModal("NewWallet");
              }}
              className="btnMain m-0 w-100 "
            >
              Create New Account
            </MDBBtn>
          </div>
          <div className="col-6">
            <MDBBtn
              onClick={() => {
                setOpenModal("OldWallet");
              }}
              className="btnMain m-0 w-100"
            >
              Import Account
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
