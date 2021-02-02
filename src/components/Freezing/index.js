import React from "react";
import Wave from "../../imgs/logo.png";
import Modal from "../sendModal/sendModal";
import WalletKeyProvider, {
  WalletKeyContext,
} from "../walletKeyContext/walletKeyContext";
import {
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";

function index() {
  return (
    <div className="wave-main">
      <div className="">
        <img width="90" src={Wave} />
      </div>
      <div className="amount mb-1">Freeze WAVE</div>
      <div className="mb-5" style={{ color: "#C3EEFD", fontWeight: "bold" }}>
        +25% Yearly yield
      </div>

      <div className="transactionsList">
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Available</div>
          <div className="right">0 WAE</div>
        </div>
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Stakad</div>
          <div className="right">0 WAE</div>
        </div>
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Pending withdrals</div>
          <div className="right">0 WAE</div>
        </div>
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Available withdrawals</div>
          <div className="right">0 WAE</div>
        </div>
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Rewards</div>
          <div className="right">0 WAE</div>
        </div>
        <div className="item d-flex justify-content-between ">
          <div className="left d-flex">Total balance</div>
          <div className="right">0 WAE</div>
        </div>
      </div>

      <div className="btn-group walletBtn mt-5">
        <MDBBtn
          onClick={() => setModal14(14)}
          className="mx-3 btnMain bold textCapital"
        >
          UNSTAKE
        </MDBBtn>
        <MDBBtn
          onClick={() => setReceiveModal(true)}
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
