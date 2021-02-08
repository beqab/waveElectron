import React, { useEffect } from "react";
import Wave from "../../imgs/logo.png";
import Modal from "../sendModal/sendModal";
import ReceiveModal from "../receiveModal/receiveModal";
import img from "../../imgs/Group65.png";

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
import axios from "axios";
// import Moment from "react-moment";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function index({ account }) {
  const [modal14, setModal14] = React.useState(false);
  const [receiveModal, setReceiveModal] = React.useState(false);
  const [transactions, setTransactions] = React.useState(false);
  const [balance, setBalance] = React.useState(0);

  const val = React.useContext(WalletKeyContext);
  // debugger;

  useEffect(() => {
    if (val?.userKey?.key) {
      axios
        .get("http://51.255.211.135:8181/wallet/" + val?.userKey?.key)
        .then((res) => {
          // debugger;

          let transactionsParse = [];
          res.data.transactions.INCOMING.map((el) =>
            transactionsParse.push({ ...el, type: "INCOMING" })
          );
          res.data.transactions.OUTGOING.map((el) =>
            transactionsParse.push({ ...el, type: "OUTGOING" })
          );

          setBalance(res.data.wallet.balance);
          setTransactions(transactionsParse);
        });
    }
  }, [val?.userKey?.key]);
  // debugger;

  const fetchWalletData = () => {
    axios
      .get("http://51.255.211.135:8181/wallet/" + val?.userKey?.key)
      .then((res) => {
        // debugger;

        let transactionsParse = [];
        res.data.transactions.INCOMING.map((el) =>
          transactionsParse.push({ ...el, type: "INCOMING" })
        );
        res.data.transactions.OUTGOING.map((el) =>
          transactionsParse.push({ ...el, type: "OUTGOING" })
        );
        setBalance(res.data.wallet.balance);

        setTransactions(transactionsParse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wave-main">
      <Modal
        account={account}
        modal14={modal14}
        reloadData={() => {
          fetchWalletData();
        }}
        toggle={(e) => setModal14(e)}
      />
      <ReceiveModal modal14={receiveModal} toggle={(e) => setReceiveModal(e)} />
      <div className="">
        <img width="90" src={Wave} />
      </div>
      <div className="amount mb-5">
        {balance ? balance : 0} <span>Wave </span>
      </div>

      <div className="btn-group walletBtn">
        <MDBBtn
          onClick={() => setReceiveModal(true)}
          className="mx-3 btnMain bold textCapital"
        >
          <svg
            id="Group_57 "
            className="pr-3"
            data-name="Group 57"
            xmlns="http://www.w3.org/2000/svg"
            // width="36.187"
            height="25"
            viewBox="0 0 36.187 33.94"
          >
            <path
              id="Path_127"
              data-name="Path 127"
              d="M569.354,180.278l-.2-.336c-.029-.054-.061-.106-.094-.158l-8.04-13.518a.566.566,0,0,0-.486-.276h-3.846a.565.565,0,1,0,0,1.131h3.525l6.911,11.62H556.613a.566.566,0,0,0-.565.565v2.984a1.132,1.132,0,0,1-1.131,1.131h-7.169a1.132,1.132,0,0,1-1.131-1.131v-2.984a.565.565,0,0,0-.565-.565H535.569l6.911-11.62h3.525a.565.565,0,1,0,0-1.131h-3.846a.565.565,0,0,0-.486.276l-7.907,13.294a2.26,2.26,0,0,0-.356.6l-.071.119a.562.562,0,0,0-.067.4,2.244,2.244,0,0,0-.027.329v8.266a2.264,2.264,0,0,0,2.262,2.262h31.651a2.264,2.264,0,0,0,2.262-2.262V181a2.261,2.261,0,0,0-.016-.259A.562.562,0,0,0,569.354,180.278Zm-1.066,8.99a1.132,1.132,0,0,1-1.131,1.131H535.507a1.132,1.132,0,0,1-1.131-1.131V181a1.125,1.125,0,0,1,.056-.349l.253-.425a1.127,1.127,0,0,1,.822-.357h9.979v2.419a2.264,2.264,0,0,0,2.262,2.262h7.169a2.264,2.264,0,0,0,2.262-2.262v-2.419h9.979a1.13,1.13,0,0,1,.928.486l.08.135a1.123,1.123,0,0,1,.123.51Z"
              transform="translate(-533.245 -157.59)"
              fill="#fff"
            />
            <path
              id="Path_128"
              data-name="Path 128"
              d="M613.085,118.952a1.58,1.58,0,0,0,0,2.231l5.248,5.248a1.573,1.573,0,0,0,1.157.459h.042a1.58,1.58,0,0,0,1.116-.46l5.248-5.248a1.578,1.578,0,0,0-2.231-2.231l-2.655,2.655V108.089a1.519,1.519,0,1,0-3.039,0v13.518l-2.655-2.655a1.58,1.58,0,0,0-2.231,0Zm1.431.8,3.62,3.62a.566.566,0,0,0,.965-.4V108.089a.389.389,0,1,1,.777,0v14.883a.566.566,0,0,0,.965.4l3.62-3.62a.46.46,0,0,1,.632,0h0a.45.45,0,0,1,0,.632l-5.248,5.248a.447.447,0,0,1-.334.128h-.046a.444.444,0,0,1-.334-.128l-5.248-5.248a.449.449,0,0,1,0-.632A.46.46,0,0,1,614.516,119.752Z"
              transform="translate(-601.403 -106.57)"
              fill="#fff"
            />
          </svg>
          Receive
        </MDBBtn>
        <MDBBtn
          // onClick={() => setReceiveModal(true)}
          onClick={() => setModal14(14)}
          className="mx-3 btnMain bold textCapital"
        >
          <svg
            className="mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            viewBox="0 0 41.046 26.749"
          >
            <path
              id="Path_123"
              data-name="Path 123"
              d="M101.042,127.009a.565.565,0,0,0-.615-.139L60.513,142.326a.565.565,0,0,0,.1,1.084L71.71,145.4l2.591,7.792a.565.565,0,0,0,.968.186l5.459-6.463,10.329,1.96a.565.565,0,0,0,.621-.322l9.467-20.924A.566.566,0,0,0,101.042,127.009Zm-4.8,2.7L71.745,144.26,62.8,142.653ZM75.056,151.881l-2.3-6.908L93.7,132.531,78.113,145.479a.565.565,0,0,0,.256.99l1.085.206Zm15.776-4.2-11.074-2.1,19.269-16.01Z"
              transform="translate(-60.151 -126.833)"
              fill="#fff"
            />
          </svg>
          Send by ID
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
      <div className="transactionsList">
        {transactions && transactions.length
          ? transactions.map((el, i) => {
              var d = new Date(el.input.timestamp);
              const Month = d.getMonth();
              let day = d.getDate();
              if (day < 10) {
                day = `0${day}`;
              }

              const time = new Date(el.input.timestamp);
              return (
                <div className="item d-flex justify-content-between ">
                  <div
                    style={{ width: "200px", textAlign: "left" }}
                    className="left d-flex"
                  >
                    {/* <div className="date ">
                      {monthNames[Month]} <br />
                      {day}
                    </div> */}
                    <div>
                      <span style={{ width: "64px", display: "inline-block" }}>
                        {el.type === "OUTGOING" ? (
                          <svg
                            className="mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            width="38"
                            viewBox="0 0 41.046 26.749"
                          >
                            <path
                              id="Path_123"
                              data-name="Path 123"
                              d="M101.042,127.009a.565.565,0,0,0-.615-.139L60.513,142.326a.565.565,0,0,0,.1,1.084L71.71,145.4l2.591,7.792a.565.565,0,0,0,.968.186l5.459-6.463,10.329,1.96a.565.565,0,0,0,.621-.322l9.467-20.924A.566.566,0,0,0,101.042,127.009Zm-4.8,2.7L71.745,144.26,62.8,142.653ZM75.056,151.881l-2.3-6.908L93.7,132.531,78.113,145.479a.565.565,0,0,0,.256.99l1.085.206Zm15.776-4.2-11.074-2.1,19.269-16.01Z"
                              transform="translate(-60.151 -126.833)"
                              fill="#fff"
                            />
                          </svg>
                        ) : (
                          <img
                            height="30"
                            style={{ marginBottom: "4px" }}
                            src={img}
                          />
                        )}
                      </span>
                      <span>
                        {el.type === "OUTGOING" ? "- " : "+ "}{" "}
                        {el.output.amount}{" "}
                        <span
                          style={{
                            color: "#ffffff8c",
                            textTransform: "capitalize",
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          Wave
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="middle text-left ">
                    <div
                      style={{
                        color: "#ffffff8c",
                        fontSize: "12px",
                        lineHeight: "9px",
                      }}
                    >
                      {el.type === "OUTGOING" ? "To" : "From"}
                    </div>
                    <div
                      style={{
                        overflow: "hidden",
                        maxWidth: "130px",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {" "}
                      {el.type === "OUTGOING" ? el.output.to : el.input.from}
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#ffffff8c",
                      fontSize: "12px",
                      // lineHeight: "9px",
                    }}
                    className="right"
                  >
                    {" "}
                    {/* <Moment format="YYYY/MM/DD">{time}</Moment> */}
                    {time.getFullYear() +
                      "/" +
                      (time.getMonth() + 1) +
                      "/" +
                      time.getDate()}
                    <br />
                    {time.getHours() +
                      ":" +
                      time.getMinutes() +
                      ":" +
                      time.getSeconds()}
                    {/* <Moment format="HH:mm:ss ">{time}</Moment> */}
                  </div>
                </div>
              );
            })
          : "Transactions not found"}
      </div>
    </div>
  );
}

export default index;

// <div className="item d-flex justify-content-between ">
// <div className="left d-flex">
//   <div className="date ">
//     {monthNames[Month]} <br />
//     {day}
//   </div>

//   {el.type === "OUTGOING" ? (
//     <svg
//       className="mr-3"
//       xmlns="http://www.w3.org/2000/svg"
//       width="38"
//       viewBox="0 0 41.046 26.749"
//     >
//       <path
//         id="Path_123"
//         data-name="Path 123"
//         d="M101.042,127.009a.565.565,0,0,0-.615-.139L60.513,142.326a.565.565,0,0,0,.1,1.084L71.71,145.4l2.591,7.792a.565.565,0,0,0,.968.186l5.459-6.463,10.329,1.96a.565.565,0,0,0,.621-.322l9.467-20.924A.566.566,0,0,0,101.042,127.009Zm-4.8,2.7L71.745,144.26,62.8,142.653ZM75.056,151.881l-2.3-6.908L93.7,132.531,78.113,145.479a.565.565,0,0,0,.256.99l1.085.206Zm15.776-4.2-11.074-2.1,19.269-16.01Z"
//         transform="translate(-60.151 -126.833)"
//         fill="#fff"
//       />
//     </svg>
//   ) : (
//     <img
//       height="30"
//       style={{ marginLeft: "10px" }}
//       src={img}
//     />
//   )}
// </div>
// <div className="right">
//   {" "}
//   {el.type === "OUTGOING" ? "- " : "+ "} {el.output.amount}
// </div>
// </div>
