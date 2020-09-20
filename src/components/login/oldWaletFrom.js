import React from "react";
import { MDBBtn } from "mdbreact";

const oldWaletFrom = ({ changeContent }) => {
  return (
    <div className="text-center w-75">
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
                    use old Wallet
                  </h3>
                  <label>wallet address</label>
                  <input
                    type="test"
                    id="defaultSubscriptionFormPassword"
                    className="form-control mb-4"
                    placeholder="wallet address"
                  />
                  <label>private key</label>

                  <input
                    type="test"
                    id="defaultSubscriptionFormEmail"
                    className="form-control"
                    placeholder="key"
                  />
                  <small
                    id="passwordHelpBlock"
                    className="form-text text-right blue-text"
                  ></small>

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-default  btn-rounded my-4 waves-effect"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default oldWaletFrom;
