import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHome from '../components/dashboard/DashboardHome';
import ProjectsList from '../components/dashboard/ProjectsList';
import ProjectDetails from '../components/dashboard/ProjectDetails';
import ClientsPage from '../components/dashboard/ClientsPage';
import ClientDetails from '../components/dashboard/ClientDetails';
import MaterialsPage from '../components/dashboard/MaterialsPage';
import MaterialDetails from '../components/dashboard/MaterialDetails';
import AlertsPage from '../components/dashboard/AlertsPage';
import ManufacturersPage from '../components/dashboard/ManufacturersPage';
import ManufacturerDetails from '../components/dashboard/ManufacturerDetails';
import SettingsPage from '../components/dashboard/SettingsPage';

const DemoDashboardPage: React.FC = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="clients/:id" element={<ClientDetails />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="materials/:id" element={<MaterialDetails />} />
        <Route path="manufacturers" element={<ManufacturersPage />} />
        <Route path="manufacturers/:id" element={<ManufacturerDetails />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/demo\" replace />} />
      </Route>
    </Routes>
  );
};

export default DemoDashboardPage;