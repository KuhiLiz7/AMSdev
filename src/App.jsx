import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Profile from './Dashboard/profile/Profile';
import Settings from './Dashboard/settings/Settings';
import Reports from './Dashboard/Reports/Reports';

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

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Adjustments from './Dashboard/Adjustments/Adjustments';
import Units from './Dashboard/Units/Units';
import ApartmentOverview from './Dashboard/Apartment/ApartmentOverview';

/**Initializing the queryclient */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 5 * 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
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
            <Route path="/units" element={<Units />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/apartment" element={<Apartment />} />
            <Route path="/apartment/:id" element={<ApartmentOverview />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/adjustments" element={<Adjustments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notification />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
