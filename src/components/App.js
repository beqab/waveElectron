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
import axios from "axios";
const { ipcRenderer } = require("electron");

const instance = axios.create({
  withCredentials: true,
  origin: true,
});

const App = () => {
  const [modal14, setModal14] = React.useState(false);
  const [receiveModal, setReceiveModal] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("Wallet");
  const [account, setAccount] = React.useState("");

  const val = React.useContext(WalletKeyContext);
  // debugger;

  useEffect(() => {
    ipcRenderer.on("getUser", (e, val) => {
      // debugger;
      if (val?.secret) {
        instance
          .post("http://51.255.211.135:8181/wallet/sign-in", {
            secret: val?.secret,
          })
          .then((res) => {
            setAccount(res.headers.account);
          });
      }
    });
  }, [val]);

  const getContent = () => {
    if (currentTab === "Wallet") {
      return <Wallet account={account} />;
    } else if (currentTab === "Stoking") {
      return <Stoking account={account} />;
    } else if (currentTab === "Freezing") {
      return <Freezing />;
    } else if (currentTab === "Security") {
      return <Security />;
    } else if (currentTab === "Settings") {
      return <Settings />;
    }

    return "mhhhh";
  };
  console.log(
    !val.userKey || (Object.keys(val).length === 0 && typeof val === "object"),
    "tttttttttttttt"
  );

  const signOut = () => {
    if (!val) {
      return true;
    } else if (!val.userKey) {
      return true;
    } else if (
      Object.keys(val.userKey).length === 0 &&
      typeof val.userKey === "object"
    ) {
      return true;
    }
    return false;
  };

  // debugger;

  return (
    <div className="app">
      {signOut() ? (
        <Login />
      ) : (
        <Header
          currentTab={currentTab}
          setCurrentTab={(tabName) => setCurrentTab(tabName)}
        />
      )}

      {/* <Modal modal14={modal14} toggle={(e) => setModal14(e)} /> */}
      <div className="container">
        <ReceiveModal
          modal14={receiveModal}
          setCurrentTab={(tabName) => setCurrentTab(tabName)}
          toggle={(e) => setReceiveModal(e)}
        />
        {signOut() ? null : getContent()}
        {/* {getContent()} */}
      </div>
    </div>
  );
};

export default App;
