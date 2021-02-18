import React from "react";

import Faq from "../../imgs/Gruppe75.png";
const { app, BrowserWindow } = require("electron");
const shell = require("electron").shell;

function index() {
  return (
    <div
      //  style={{ marginTop: "50px" }}

      className="wave-main"
    >
      {/* <div className="">
        <img width="50" src={Faq} />
      </div>
      <div className="amount mb-1">Help</div> */}
      <div
        style={{ maxWidth: "500px", color: "#fff" }}
        className="container settingsContainer mt-4"
      >
        <h5>Wave Wallet help Center</h5>
        <h6
          style={{
            color: "#c1c1c1",
          }}
        >
          Update your wallet to the latest version:{" "}
        </h6>
        <a
          onClick={(e) => {
            e.preventDefault();
            shell.openExternal("https://www.waveplatform.io/");
          }}
          href="https://www.waveplatform.io/"
        >
          www.waveplatform.io/downloads
        </a>
        <div className="row mt-5">
          <div className="col-6">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="book-open"
              width="50"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="svg-inline--fa fa-book-open fa-w-18 fa-2x"
            >
              <path
                fill="currentColor"
                d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"
                class=""
              ></path>
            </svg>
            <div>
              <a
                style={{
                  color: "#c1c1c1",
                  lineHeight: "18px",
                  display: "inline-block",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  shell.openExternal("https://www.waveplatform.io/");
                }}
                href="https://www.waveplatform.io/"
              >
                Knowledge <br />
                Base
              </a>
            </div>
          </div>
          <div className="col-6">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="comments"
              role="img"
              width="50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="svg-inline--fa fa-comments fa-w-18 fa-2x"
            >
              <path
                fill="currentColor"
                d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
                class=""
              ></path>
            </svg>
            <div>
              <a
                style={{
                  color: "#c1c1c1",
                  lineHeight: "18px",
                  display: "inline-block",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  shell.openExternal("https://www.waveplatform.io/");
                }}
                href="https://www.waveplatform.io/"
              >
                Chat with <br /> Support
              </a>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h5>
            <a
              style={{
                color: "#c1c1c1",
                lineHeight: "18px",
                display: "inline-block",
                fontSize: "14px",
                marginTop: "8px",
              }}
              onClick={(e) => {
                e.preventDefault();
                shell.openExternal("https://t.me/waveplatformio");
              }}
              href="https://www.waveplatform.io/"
            >
              Check our Telegram Cannel
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default index;
