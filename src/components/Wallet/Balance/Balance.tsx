import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';

import useBalance from '../../../hooks/useBalance';
import ChargeAccount from './ChargeAccount';
import xlmLogo from '../../../assets/xlm-logo.png';

function Balance(publicKey) {
  const accountBalance = useBalance(publicKey);
  return (
    <>
      <Row>
        <Col>
          <h3 className="text-primary">Account balance</h3>
          <div className="d-flex align-items-center">
            { typeof accountBalance === "string"  ? (
              <> 
                <Alert variant='success' className='balance-info'>{accountBalance}</Alert>
                <img src={xlmLogo} alt="XLM Logo" width="30" height="30" className="ml-2" style={{
                  marginLeft: '10px', marginBottom: '10px'
                }} />
              </>
            ) : (
              <ChargeAccount publicKey={publicKey}/>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Balance;
