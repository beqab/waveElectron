import React, { Component } from "react";
import { MDBBtn } from "mdbreact";

const welcome = ({ changeContent }) => {
  return (
    <div className="mb-5 ">
      <h2 className="text-center mb-5">welcome to WAVE</h2>
      <h5 className="text-center mb-5">create new walt or use exist</h5>
      <div className="d-flex justify-content-center">
        <MDBBtn
          onClick={() => {
            console.log("click");
            changeContent("newWalletForm");
          }}
          color="light-blue mx-3"
        >
          crate new
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            console.log("click");
            changeContent("oldWalletForm");
          }}
          color="light-blue mx-3"
        >
          use old
        </MDBBtn>
      </div>
    </div>
  );
};

export default welcome;
