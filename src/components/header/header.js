import React, { Component } from "react";
import classnames from "classnames";
import Logo from "../../imgs/logoFFF.png";
import Wallet from "../../imgs/Gruppe59.png";
import Stoking from "../../imgs/Gruppe60.png";
import Settings from "../../imgs/Pfad151.png";
import Freezing from "../../imgs/Gruppe71.png";
import user from "../../imgs/Gruppe64.png";
import Secur from "../../imgs/Gruppe61.png";
import Faq from "../../imgs/Gruppe75.png";

const header = ({ setCurrentTab, currentTab }) => {
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
              Stoking
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
      </ul>
    </div>
  );
};

export default header;
