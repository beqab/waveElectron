import React from "react";
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
import QR from "../../imgs/qr.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ModalPage = ({ modal14, toggle }) => {
  const [address, setAddress] = React.useState(
    "bnb1dq3r0qn4qdxjt82ym6l79p9e4mqy3l75p94mur"
  );
  const [copied, setCopied] = React.useState(false);

  return (
    <MDBContainer className="MainModalWrapper">
      <MDBModal isOpen={modal14} toggle={() => toggle(null)} centered>
        <MDBModalHeader className="text-center" toggle={() => toggle(null)}>
          <img src={Logo} width="60" />
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol md="10" lg="10" xl="10" className="mx-auto mt-3">
              <MDBCard>
                <h3 className="modalTitle">Your Wave Coin Address</h3>
                <MDBCardBody className="mx-4">
                  <div className="WalletAddress ">
                    <div>{address}</div>

                    <CopyToClipboard
                      text={address}
                      onCopy={() => setCopied(true)}
                    >
                      <span
                        style={{ color: copied ? "green" : "#007bff" }}
                        className="copy"
                      >
                        copy
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="text-center">
                    <img src={QR} />
                  </div>
                  <div className="text-center pt-3 mb-3">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
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
