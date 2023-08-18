import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WalletPage from './pages/WalletPage';

function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path='/wallet' Component={WalletPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
