import React from 'react';
import { Button } from 'react-bootstrap';

function Register(): React.ReactElement {
  return (
    <div className="d-grid gap-2 mt-3">
      <p>Don&apos;t have an account? 👇👇👇</p>
      <Button variant="secondary">Click here</Button>
    </div>
  );
}

export default Register;
