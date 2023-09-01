import React, { useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';

import useBalance from '../../../hooks/useBalance';
import ChargeAccount from './ChargeAccount';
import xlmLogo from '../../../assets/xlm-logo.png';

function Balance( {publicKey, setBalance} ) {
  const accountBalance = useBalance({publicKey});
  const isStringBalance = typeof accountBalance === 'string';

  useEffect(() => {
    if (isStringBalance) {
      setBalance(accountBalance);
    }else{
      setBalance(0);
    }
  }, [accountBalance, isStringBalance]);
  return (
    <>
      <Row>
        <Col>
          <h3 className="text-primary">Account balance</h3>
          <div className="d-flex align-items-center">
            { isStringBalance  ? (
              <> 
                <Alert variant='success' className='balance-info'>{accountBalance}</Alert>
                <img src={xlmLogo} alt="XLM Logo" width="30" height="30" className="ml-2" style={{
                  marginLeft: '10px', marginBottom: '10px'
                }} />
              </>
            ) : (
              <ChargeAccount publicKey={{publicKey}}/>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Balance;
