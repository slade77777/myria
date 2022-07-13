import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Assets from '../pages/Assets';
import Asset from '../pages/Asset';
import MainLayout from '../components/Layout/MainLayout';

export default function index() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/assets"
        element={
          <MainLayout>
            <Assets />
          </MainLayout>
        }
      />
      <Route
        path="/assets/:id"
        element={
          <MainLayout>
            <Asset />
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
