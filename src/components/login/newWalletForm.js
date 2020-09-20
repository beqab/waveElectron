import React from "react";
import { MDBBtn } from "mdbreact";

const newWalletForm = ({ changeContent }) => {
  return (
    <div>
      <form className="my-5 mx-md-10" action="">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <div style={{ boxShadow: "none " }} className="card">
              <div className="card-body">
                <div className="text-left">
                  <span
                    className="cursor-pointer"
                    onClick={() => changeContent("Welcome")}
                  >
                    <i class="fas fa-backward"></i> go back
                  </span>
                </div>

                <form
                  className="text-center"
                  style={{ color: "#757575" }}
                  action="#!"
                >
                  <h3 className="font-weight-bold my-4 pb-2 text-center dark-grey-text">
                    crete new Wallet
                  </h3>

                  <small
                    id="passwordHelpBlock"
                    className="form-text text-right blue-text"
                  ></small>
                  <MDBBtn color="light-green">crete</MDBBtn>
                  <div className="text-center"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default newWalletForm;
