import React, { useEffect } from "react";
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
// import Logo from "../../imgs/logo.png";
import ModalHead from "../../imgs/moadlHeder.png";
import QR from "../../imgs/qr.png";
import classnames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { WalletKeyContext } from "../walletKeyContext/walletKeyContext";

const ModalPage = ({ modal14, toggle, currentWallet }) => {
  const val = React.useContext(WalletKeyContext);
  const [address, setAddress] = React.useState("");
  useEffect(() => {
    let t = val?.userKey?.wallets?.find(
      (el) => el.accountName === val.userKey.currentUser
    );

    if (t) {
      setAddress(t.key);
    }
  }, [val?.userKey?.wallets]);
  const [copied, setCopied] = React.useState(false);

  return (
    <MDBContainer className="MainModalWrapper w650">
      <MDBModal
        isOpen={modal14}
        toggle={() => {
          setCopied(false);
          toggle(null);
        }}
        className="ttttest"
        centered
      >
        <MDBModalHeader
          className="text-center addressModal"
          toggle={() => {
            setCopied(false);

            toggle(null);
          }}
        >
          <img className="w-100" src={ModalHead} />
          <h3 className="modalTitle">Your Wave Coin Address</h3>

          <div className="WalletAddress ">
            <div>{address}</div>
          </div>
          {/* <img src={Logo} width="60" /> */}
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol md="10" lg="10" xl="10" className="mx-auto mt-3">
              <MDBCardBody className="mx-4 pt-0">
                <div className="text-center">
                  <img
                    src={
                      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                      address
                    }
                  />
                </div>
                <div className="text-center pt-3 mb-3">
                  <CopyToClipboard
                    text={address}
                    onCopy={() => setCopied(true)}
                  >
                    <span
                      style={{
                        color: copied ? "green " : "#007bff",
                        fontWeight: "bold",
                      }}
                      className={classnames("copy btn btnMain w-100 ", {
                        green: copied,
                      })}
                    >
                      copy
                    </span>
                  </CopyToClipboard>
                  {/* <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                    >
                      Send
                    </MDBBtn> */}
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
