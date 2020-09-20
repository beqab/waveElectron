import React, { Component } from "react";
import Logo from "../../imgs/logo.png";

export class header extends Component {
  render() {
    return (
      <div className="header py-2 container-fluid">
        <div className="row align-items-center">
          <div className=" col-sm-2">
            <a href="">
              <img src={Logo} width="50" />
            </a>
          </div>
          <div className="col-sm-8 d-flex align-items-center justify-content-center">
            <ul className="menu d-flex mb-0  list-inline  ml-0">
              <li className="mx-3">
                <a href="#">
                  <i class="fas fa-wallet"></i>
                </a>
              </li>
              <li className="mx-3">
                <a href="">
                  <i class="fas fa-exchange-alt"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="menu col-sm-2 d-flex justify-content-end">
            <a href="#">
              <i class="fas fa-cog"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default header;
