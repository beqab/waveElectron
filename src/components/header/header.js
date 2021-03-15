import React, { Component } from "react";
import classnames from "classnames";
import Logo from "../../imgs/logoFFF.png";
import Wallet from "../../imgs/Gruppe59.png";
import Stoking from "../../imgs/Gruppe60.png";
import Freezing from "../../imgs/Pfad151.png";
import Settings from "../../imgs/Gruppe71.png";
import user from "../../imgs/Gruppe64.png";
import Secur from "../../imgs/Gruppe61.png";
import Faq from "../../imgs/Gruppe75.png";
import { ipcRenderer } from "electron";
import { WalletKeyContext } from "../walletKeyContext/walletKeyContext";

const header = ({ setCurrentTab, currentTab }) => {
  const { setUserKey } = React.useContext(WalletKeyContext);

  return (
    <div className="header py-2 container-fluid align-items-between h-100">
      <div className=" align-items-center flex-column ">
        <div className=" text-center pt-4">
          <a href="">
            <img src={Logo} width="90" />
          </a>
        </div>

        <ul className="menu d-flex mb-0   flex-column  ml-0">
          <li
            className={classnames("px-3", {
              active: currentTab === "Wallet",
            })}
            onClick={() => setCurrentTab("Wallet")}
          >
            <a href="#">
              <span>
                <img src={Wallet} />
              </span>
              Wallet
            </a>
          </li>
          <li
            className={classnames("px-3", {
              active: currentTab === "Stoking",
            })}
            onClick={() => setCurrentTab("Stoking")}
          >
            <a href="#">
              <span>
                <img src={Stoking} />
              </span>
              Staking
            </a>
          </li>
          <li
            className={classnames("px-3", {
              active: currentTab === "Freezing",
            })}
            onClick={() => setCurrentTab("Freezing")}
          >
            <a href="#">
              <span>
                <img src={Freezing} />
              </span>
              Freezing
            </a>
          </li>
          <li
            className={classnames("px-3", {
              active: currentTab === "Security",
            })}
            onClick={() => setCurrentTab("Security")}
          >
            <a href="#">
              <span>
                <img src={Secur} />
              </span>
              Security
            </a>
          </li>
          <li
            className={classnames("px-3", {
              active: currentTab === "Account",
            })}
            onClick={() => setCurrentTab("Account")}
          >
            <a href="#">
              {" "}
              <span>
                <img src={user} />
              </span>
              Account
            </a>
          </li>
        </ul>
      </div>
      <ul className="menu d-flex mb-0   flex-column  ml-0">
        <li
          className={classnames("px-3", {
            active: currentTab === "Settings",
          })}
          onClick={() => setCurrentTab("Settings")}
        >
          <a href="#">
            <span>
              <img src={Settings} />
            </span>
            Settings
          </a>
        </li>
        <li
          className={classnames("px-3", {
            active: currentTab === "Help",
          })}
          onClick={() => setCurrentTab("Help")}
        >
          <a href="#">
            <span>
              <img src={Faq} />
            </span>
            Help
          </a>
        </li>
        <li
          className={classnames("px-3", {
            active: currentTab === "logout",
          })}
          onClick={() => {
            ipcRenderer.send("logout", {});
            setUserKey({});
          }}
        >
          <a href="#">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28.256"
                height="36.277"
                viewBox="0 0 32.256 36.277"
              >
                <g
                  id="Group_114"
                  data-name="Group 114"
                  transform="translate(-2475.083 -2678.749)"
                >
                  <path
                    id="Path_204"
                    data-name="Path 204"
                    d="M2497.1,2702.519a15.628,15.628,0,1,1-11.71-.031"
                    transform="translate(0 -18.099)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="1"
                  />
                  <rect
                    id="Rectangle_87"
                    data-name="Rectangle 87"
                    width="2.95"
                    height="19.591"
                    rx="1.475"
                    transform="translate(2489.736 2679.249)"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </span>
            logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default header;
