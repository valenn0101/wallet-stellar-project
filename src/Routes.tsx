import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
