import React, { useEffect } from "react";
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
// import "../style/test.scss";
import ReceiveModal from "./receiveModal/receiveModal";
import Wallet from "./Wallet";
import Stoking from "./Stoking";
import Freezing from "./Freezing";
import Security from "./security";
import Settings from "./settings";

const App = () => {
  const [modal14, setModal14] = React.useState(false);
  const [receiveModal, setReceiveModal] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("Wallet");

  const val = React.useContext(WalletKeyContext);

  console.log(val.userKey, "val.userKey");
  useEffect(() => {}, []);

  const getContent = () => {
    if (currentTab === "Wallet") {
      return <Wallet />;
    } else if (currentTab === "Stoking") {
      return <Stoking />;
    } else if (currentTab === "Freezing") {
      return <Freezing />;
    } else if (currentTab === "Security") {
      return <Security />;
    } else if (currentTab === "Settings") {
      return <Settings />;
    }

    return "mhhhh";
  };
  console.log(val.userKey, "val.userKey");
  return (
    <div className="app">
      {!val.userKey && <Login />}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tabName) => setCurrentTab(tabName)}
      />
      {/* <Modal modal14={modal14} toggle={(e) => setModal14(e)} /> */}
      <div className="container">
        <ReceiveModal
          modal14={receiveModal}
          setCurrentTab={(tabName) => setCurrentTab(tabName)}
          toggle={(e) => setReceiveModal(e)}
        />
        {getContent()}
      </div>
    </div>
  );
};

export default App;
