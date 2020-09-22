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

const ModalPage = ({ modal14, toggle }) => {
  //   state = {
  //     modal14: false,
  //   };

  return (
    <MDBContainer className="MainModalWrapper">
      <MDBModal isOpen={modal14} toggle={() => toggle(null)} centered>
        <MDBModalHeader className="text-center" toggle={() => toggle(null)}>
          <img src={Logo} width="60" />
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
              <MDBCard>
                <h3 className="modalTitle">Your Binance Coin Address</h3>
                <MDBCardBody className="mx-4">
                  <MDBInput
                    clear
                    label="Send to Wave coin address"
                    group
                    type="email"
                    validate
                    error="text"
                    success="right"
                  />
                  <MDBInput
                    clear
                    label="Memo (recommended)"
                    group
                    type="text"
                    validate
                    containerClass="mb-0"
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
                    <MDBInput hint="0.00" type="number" />
                    <span className="labelCurr">Wave</span>
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
