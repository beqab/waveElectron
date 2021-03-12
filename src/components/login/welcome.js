import React, { Component } from "react";
import { MDBBtn } from "mdbreact";

const welcome = ({ changeContent }) => {
  return (
    <div className="mb-5 p-4">
      <div className="text-left mb-3">
        <span
          className="cursor-pointer "
          onClick={() => {
            changeContent("first");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22.608"
            height="35.445"
            viewBox="0 0 42.608 35.445"
          >
            <g
              id="Group_91"
              data-name="Group 91"
              transform="translate(-1363.867 -348.544)"
            >
              <line
                id="Line_51"
                data-name="Line 51"
                x1="38.272"
                transform="translate(1366.703 366.21)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-width="3"
              />
              <path
                id="Path_176"
                data-name="Path 176"
                d="M6013.589-1112.334l-15.6,15.6,15.6,15.6"
                transform="translate(-4632 1463)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-width="3"
              />
            </g>
          </svg>
          {/* go back */}
        </span>
      </div>

      {/* <h2 className="text-center mb-5">welcome to WAVE</h2> */}
      <h5
        style={{ color: "#fff", fontWeight: "bold" }}
        className="text-center mb-5"
      >
        Create or restore a wallet
      </h5>
      <div className="d-flex justify-content-center">
        <div className="createOrRestoreCard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130.13"
            height="128.037"
            viewBox="0 0 130.13 128.037"
          >
            <g
              id="Group_95"
              data-name="Group 95"
              transform="translate(-74.54 -519.147)"
            >
              <path
                id="Path_177"
                data-name="Path 177"
                d="M179.124,612.279v53.728a7.225,7.225,0,0,1-7.2,7.2H83.744a7.225,7.225,0,0,1-7.2-7.2V577.832a7.225,7.225,0,0,1,7.2-7.2h70.842"
                transform="translate(0 -28.028)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              />
              <path
                id="Path_178"
                data-name="Path 178"
                d="M188.466,601.066l-18.078,5.523,5.523-18.078,67.364-67.364L255.829,533.7Z"
                transform="translate(-53.16 0)"
                fill="none"
                stroke="#fff"
                stroke-linejoin="round"
                stroke-width="4"
              />
              <path
                id="Path_179"
                data-name="Path 179"
                d="M324.535,569.608l6.807,6.808L306.608,601.15"
                transform="translate(-130.321 -27.451)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              />
            </g>
          </svg>

          <MDBBtn
            onClick={() => {
              console.log("click");
              changeContent("newWalletForm");
            }}
            style={{
              transform: "translate(-16px, 70px)",
            }}
            color="light-blue mx-3 btnMain"
          >
            Create New Wallet
          </MDBBtn>
        </div>
        <div className="createOrRestoreCard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="144.615"
            height="114.756"
            viewBox="0 0 144.615 114.756"
            style={{
              transform: "translate(10px, 10px)",
            }}
          >
            <g
              id="Group_94"
              data-name="Group 94"
              transform="translate(-513.858 -537.34)"
            >
              <path
                id="Path_180"
                data-name="Path 180"
                d="M588.663,633.492H523.169a7.312,7.312,0,0,1-7.311-7.311V556.722a7.312,7.312,0,0,1,7.311-7.311h7.9l6.059-10.071h24.986l6.021,10.071h72.474a7.312,7.312,0,0,1,7.311,7.311v32.1"
                transform="translate(0 0)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              />
              <circle
                id="Ellipse_2"
                data-name="Ellipse 2"
                cx="29.015"
                cy="29.015"
                r="29.015"
                transform="translate(598.443 592.065)"
                fill="none"
                stroke="#fff"
                stroke-linejoin="round"
                stroke-width="4"
              />
              <line
                id="Line_52"
                data-name="Line 52"
                y2="28.513"
                transform="translate(627.458 604.853)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              />
              <path
                id="Path_181"
                data-name="Path 181"
                d="M725.88,717.987l15.536,15.536,16.038-16.039"
                transform="translate(-114.05 -96.739)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              />
            </g>
          </svg>

          <MDBBtn
            onClick={() => {
              console.log("click");
              changeContent("oldWalletForm");
            }}
            color="light-blue mx-3 btnMain"
          >
            Import your wallet
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default welcome;
