import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InvestorLayout from './layouts/InvestorLayout';
import AdminLayout from './layouts/AdminLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/investor/Dashboard';
import Properties from './pages/investor/Properties';
import PropertyDetail from './pages/investor/PropertyDetail';
import RentIncome from './pages/investor/RentIncome';
import Marketplace from './pages/investor/Marketplace';
import Notifications from './pages/investor/Notifications';
import KYCFlow from './pages/investor/KYCFlow';
import AdminDashboard from './pages/admin/Dashboard';
import PropertyManagement from './pages/admin/PropertyManagement';
import RentManagement from './pages/admin/RentManagement';
import InvestorManagement from './pages/admin/InvestorManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* KYC flow (standalone, no sidebar) */}
        <Route path="/kyc" element={<div className="min-h-screen bg-slate-50 p-8 max-w-5xl mx-auto"><KYCFlow /></div>} />

        {/* Investor routes */}
        <Route path="/investor" element={<InvestorLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:propertyId" element={<PropertyDetail />} />
          <Route path="rent-income" element={<RentIncome />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<PropertyManagement />} />
          <Route path="rent-management" element={<RentManagement />} />
          <Route path="investors" element={<InvestorManagement />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
