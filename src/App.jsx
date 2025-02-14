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
        <Route path="/communication" element={<Communication />} />
        <Route path="/adjustments" element={<Adjustments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/financials" element={<Financials />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
