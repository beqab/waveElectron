import React from "react";
import Wave from "../../imgs/logo.png";
import Modal from "../sendModal/sendModal";
import Secur from "../../imgs/Gruppe61.png";

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
        <svg
          id="Group_78"
          data-name="Group 78"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          viewBox="0 0 105.565 112.002"
        >
          <path
            id="Path_135"
            data-name="Path 135"
            d="M178.865,75.156a1.527,1.527,0,0,0-1.4-.181c-19.878,7.328-34.284,4.867-49.723-8.5a1.529,1.529,0,0,0-2,0C110.3,79.842,95.891,82.3,76.014,74.975a1.53,1.53,0,0,0-2.059,1.435c0,46.6,18.973,83.6,52.054,101.512a1.53,1.53,0,0,0,1.522-.038,102.54,102.54,0,0,0,38.353-41.268c9.049-17.536,13.636-37.793,13.636-60.206A1.529,1.529,0,0,0,178.865,75.156Zm-15.7,60.058a99.519,99.519,0,0,1-36.471,39.6C95.618,157.575,77.6,122.635,77.028,78.581c19.368,6.6,34.406,3.88,49.709-8.938,15.3,12.817,30.344,15.535,49.709,8.938C176.16,99.637,171.7,118.681,163.165,135.214Z"
            transform="translate(-73.955 -66.104)"
            fill="#fff"
          />
          <path
            id="Path_136"
            data-name="Path 136"
            d="M206.5,168.45a8.943,8.943,0,1,0-13.61,7.625L188.972,200.6a1.53,1.53,0,0,0,1.51,1.771h14.143a1.53,1.53,0,0,0,1.51-1.771l-3.928-24.515A8.945,8.945,0,0,0,206.5,168.45Zm-14.221,30.86,3.473-21.752,3.607.057,3.476,21.7Zm5.278-24.977a5.884,5.884,0,1,1,5.884-5.883A5.891,5.891,0,0,1,197.554,174.333Z"
            transform="translate(-144.771 -123.794)"
            fill="#fff"
          />
        </svg>
      </div>
      <div className="amount mb-1">Security</div>

      <div className="transactionsList"></div>
    </div>
  );
}

export default index;
