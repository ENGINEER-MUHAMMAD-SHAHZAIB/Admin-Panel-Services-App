import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/pages/dashboard/Dashboard';
import { ServicesPage } from '@/pages/services/ServicesPage';
import { OrdersPage } from '@/pages/orders/OrdersPage';
import { CustomersPage } from '@/pages/users/CustomersPage';
import { TechniciansPage } from '@/pages/users/TechniciansPage';
import { ControllersPage } from '@/pages/users/ControllersPage';
import { LoginPage } from '@/pages/auth/Login';
import { ZonesPage } from '@/pages/zones/ZonesPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { HistoryPage } from '@/pages/history/HistoryPage';

import { CategoriesPage } from '@/pages/categories/CategoriesPage';
import { EventBannerPage } from '@/pages/banners/EventBannerPage';
import { QueriesPage } from '@/pages/queries/QueriesPage';
import { NotificationsPage } from '@/pages/notifications/NotificationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="banners" element={<EventBannerPage />} />
          <Route path="queries" element={<QueriesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="technicians" element={<TechniciansPage />} />
          <Route path="controllers" element={<ControllersPage />} />
          <Route path="zones" element={<ZonesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="finance" element={<div className="p-4">Finance Page (Coming Soon)</div>} />
          <Route path="complaints" element={<div className="p-4">Complaints Page (Coming Soon)</div>} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
