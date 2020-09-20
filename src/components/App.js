import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import Header from "./header/header";
import Login from "./login/login";

const App = () => {
  return (
    <div className="app">
      <Login />
      <Header />
      <button type="button" class="btn btn-primary">
        Primary
      </button>
      <button type="button" class="btn btn-secondary">
        Secondary
      </button>
      <button type="button" class="btn btn-success">
        Success
      </button>
      <button type="button" class="btn btn-danger">
        Danger
      </button>
      <button type="button" class="btn btn-warning">
        Warning
      </button>
      <button type="button" class="btn btn-info">
        Info
      </button>
      <button type="button" class="btn btn-light">
        Light
      </button>
      <button type="button" class="btn btn-dark">
        Dark
      </button>
      <button type="button" class="btn btn-link">
        Link
      </button>
      <MDBCol>
        <MDBCard style={{ width: "22rem" }}>
          <MDBCardImage
            className="img-fluid"
            src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
            waves
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </MDBCardText>
            <MDBBtn href="#">MDBBtn</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};

export default App;
