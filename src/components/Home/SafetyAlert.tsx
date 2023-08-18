import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

type Keypair = {
  secretKey: string | null;
  publicKey: string | null;
};
function SafetyAlert({ secretKey, publicKey }: Keypair): React.ReactElement {
  const dispatch = useDispatch();

  const backHome = () => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
  return (
    <>
      <h3 className="Auth-form-title">Dear User please copy your keys!</h3>
      <div className="form-group mt-3">
        <div className="container">
          <h6>Your Secret Key</h6>
          <p className="overflow-auto" style={{ maxHeight: "200px" }}>
            {secretKey}{" "}
          </p>
        </div>

        <div className="container">
          <h6>Your Public Key</h6>
          <p className="overflow-auto" style={{ maxHeight: "200px" }}>
            {publicKey}{" "}
          </p>
        </div>
      </div>
      <div className="d-grid gap-2 mt-3">
        <Button variant="secondary" onClick={backHome}>
          {" "}
          Back Home{" "}
        </Button>
        <Button variant="warning"> Continue </Button>
      </div>
    </>
  );
}

export default SafetyAlert;