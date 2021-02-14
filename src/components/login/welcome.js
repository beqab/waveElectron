import React, { Component } from "react";
import { MDBBtn } from "mdbreact";

const welcome = ({ changeContent }) => {
  return (
    <div className="mb-5 p-4">
      <div className="text-left mb-3">
        <span
          className="cursor-pointer "
          onClick={() => {
            changeContent("first");
          }}
        >
          <i class="fas fa-backward"></i> go back
        </span>
      </div>

      {/* <h2 className="text-center mb-5">welcome to WAVE</h2> */}
      <h5 className="text-center mb-5">
        Create your wave wallet or import from backup
      </h5>
      <div className="d-flex justify-content-center">
        <MDBBtn
          onClick={() => {
            console.log("click");
            changeContent("newWalletForm");
          }}
          color="light-blue mx-3 btnMain"
        >
          Create New Wallet
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            console.log("click");
            changeContent("oldWalletForm");
          }}
          color="light-blue mx-3 btnMain"
        >
          Import your wallet
        </MDBBtn>
      </div>
    </div>
  );
};

export default welcome;
