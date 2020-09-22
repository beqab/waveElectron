import React from "react";
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
import Header from "./header/header";
import Login from "./login/login";
import WalletKeyProvider, {
  WalletKeyContext,
} from "./walletKeyContext/walletKeyContext";
import Wave from "../imgs/logo.png";
import Modal from "./sendModal/sendModal";
import "../style/test.scss";
import ReceiveModal from "./receiveModal/receiveModal";

const App = () => {
  const [modal14, setModal14] = React.useState(false);
  const [receiveModal, setReceiveModal] = React.useState(false);

  const val = React.useContext(WalletKeyContext);

  return (
    <div className="app">
      {!val.userKey && <Login />}
      <Header />
      <Modal modal14={modal14} toggle={(e) => setModal14(e)} />
      <ReceiveModal modal14={receiveModal} toggle={(e) => setReceiveModal(e)} />
      <div className="container">
        <div className="wave-main">
          <div className="WaveCircle">
            <img width="90" src={Wave} />
          </div>
          <div className="amount mb-5">
            45.5 <span>Wave </span>
          </div>

          <div className="btn-group">
            <MDBBtn
              onClick={() => setModal14(14)}
              className="mx-3"
              color="primary"
              outline
              rounded
            >
              Send
            </MDBBtn>
            <MDBBtn
              onClick={() => setReceiveModal(true)}
              className="mx-3"
              color="primary"
              outline
              rounded
            >
              Receive
            </MDBBtn>

            <MDBBtn
              className="mx-3"
              tag="a"
              size="lg"
              gradient="blue"
              floating
              rounded
            >
              <MDBIcon icon="exchange-alt" />
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
