import { Route, Routes } from 'react-router-dom';
// import DefaultLayout from './layout/DefaultLayout';
// import Dashboard from './Dashboard/Dashboard';
import Communication from './Dashboard/communication/Communication';
import Adjustments from './Dashboard/adjustments/Adjustments';
import Profile from './Dashboard/profile/Profile';
import Settings from './Dashboard/settings/Settings';
import Reports from './Dashboard/Reports/Reports';
import Financials from './Dashboard/financials/Financials';

import Login from './pages/LoginPage';
// import Protected from './components/Protected';
import NotFound from './pages/NotFound';
import AppLayout from './layout/AppLayout';
import Protected from './components/Protected';
import Dashboard from './Dashboard/Dashboard';
import Tenants from './Dashboard/Tenants/Tenants';
import Payments from './Dashboard/Payments/Payments';
import Notification from './Dashboard/Notifications/Notification';
import Apartment from './Dashboard/Apartment/Apartment';
import Maintenance from './Dashboard/Maintenance/Maintenance';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/apartment" element={<Apartment />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notification />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
