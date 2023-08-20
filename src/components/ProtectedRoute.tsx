import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import WarningModal from './WarningModal';
import { ALERT_MESSAGES } from '../utils/constants';

function ProtectedRoute({ children }): React.ReactElement {
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();

  if (!session) {
    return (
      <WarningModal
        show={true}
        message={ALERT_MESSAGES.notSession}
        tittleMessage={ALERT_MESSAGES.alert}
        onClose={() => {
          navigate('/');
        }}
        onContinue={() => {
          navigate('/');
        }}
      />
    );
  } else {
    return children;
  }
}

export default ProtectedRoute;
