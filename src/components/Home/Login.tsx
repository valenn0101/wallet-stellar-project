import React from 'react';
import { Button } from 'react-bootstrap';

function Login(): React.ReactElement {
  return (
    <>
      <h3 className="auth-form-title">Sign In</h3>
      <div className="form-group mt-3">
        <h6>Your Secret Key</h6>
        <input type="text" className="form-control mt-1" placeholder="Secret Key" />
      </div>
      <div className="d-grid gap-2 mt-3">
        <Button variant="success">Submit</Button>
      </div>
    </>
  );
}

export default Login;
