import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './Dashboard/Dashboard';
import Communication from './Dashboard/communication/Communication';
import Adjustments from './Dashboard/adjustments/Adjustments';
import Profile from './Dashboard/profile/Profile';
import Settings from './Dashboard/settings/Settings';
import Reports from './Dashboard/Reports/Reports';
import Financials from './Dashboard/financials/Financials';

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/adjustments" element={<Adjustments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/financials" element={<Financials />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
