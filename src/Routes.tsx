import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WalletPage from './pages/WalletPage';
import ProtectedRoute from './components/ProtectedRoute';

function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path='/wallet' element={
        <ProtectedRoute>
          <WalletPage />
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
