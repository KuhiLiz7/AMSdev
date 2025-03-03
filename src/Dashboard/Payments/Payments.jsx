import { useState } from 'react';

/**Fake tenants data but will be deleted later on */
const initialTenants = [
  {
    id: 1,
    tenantName: 'John Doe',
    amount: 12000,
    phoneNumber: '0712345678',
    apartmentName: 'Serenity Towers',
    unitNumber: 'A-101',
    paidStatus: true, // true = Paid, false = Not Paid
    date: '1 march 2.05pm',
    activeStatus: true, // true = Active, false = Inactive
  },
  {
    id: 2,
    tenantName: 'Jane Smith',
    amount: 11000,
    phoneNumber: '0723456789',
    apartmentName: 'Green Oasis Villas',
    unitNumber: 'V-203',
    paidStatus: false, // Not Paid
    date: '',
    activeStatus: true, // Active
  },
  {
    id: 3,
    tenantName: 'Michael Johnson',
    amount: 8000,
    phoneNumber: '0734567890',
    apartmentName: 'Coastal Haven Hotel',
    unitNumber: 'H-305',
    paidStatus: true, // Paid
    date: '5 march 2.05pm',
    activeStatus: false, // Inactive
  },
  {
    id: 4,
    tenantName: 'Sarah Williams',
    amount: 5000,
    phoneNumber: '0745678901',
    apartmentName: 'Campus Lodge',
    unitNumber: 'L-407',
    paidStatus: false, // Not Paid
    date: '',
    activeStatus: true, // Active
  },
];

function Payments() {
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { currentUser, isLoading, error } = useUser();

  console.log(currentUser);

  const handlePayment = () => {
    setPaymentStatus('Paid');
    setShowConfirmation(true);
  };
  return (
    <div>
      <h2 className="mb-8 block text-xl font-semibold">
        Tenants Payments Overview
      </h2>

      <div className="min-h-screen bg-gray-900 text-white">
        <main className="mx-auto max-w-4xl space-y-6 p-6">
          <div className="rounded-lg bg-gray-800 p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Payment Details</h2>
            <div className="space-y-2">
              <p>
                <span className="text-gray-400">Rent Amount:</span>{' '}
                <span className="font-semibold text-yellow-400">
                  KES 25,000
                </span>
              </p>
              <p>
                <span className="text-gray-400">Due by:</span>{' '}
                <span className="font-semibold">5th November 2023</span>
              </p>
              <p>
                <span className="text-gray-400">Status:</span>{' '}
                <span
                  className={`font-semibold ${
                    paymentStatus === 'Pending'
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                >
                  {paymentStatus}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Apartment:</span>{' '}
                <span className="font-semibold">12, Bingo Apartments</span>
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              Choose Payment Method
            </h2>

            <div className="cursor-pointer rounded-md bg-green-500 p-4 transition hover:bg-green-600">
              <h3 className="text-lg font-semibold">📱 Pay via M-Pesa</h3>
              <p className="text-sm">Secure and fast payment with M-Pesa.</p>
            </div>

            <div className="mt-4 rounded-md bg-gray-700 p-4">
              <h3 className="text-md font-semibold">
                M-Pesa Payment Instructions:
              </h3>
              <ul className="mt-2 list-inside list-decimal space-y-1 text-sm text-gray-300">
                <li>Go to M-Pesa on your phone.</li>
                <li>Select "Lipa na M-Pesa".</li>
                <li>
                  Enter Paybill Number:{' '}
                  <span className="text-yellow-400">123456</span>
                </li>
                <li>
                  Enter Account Number:{' '}
                  <span className="text-yellow-400">12GVA</span>
                </li>
                <li>
                  Enter Amount:{' '}
                  <span className="text-yellow-400">KES 25,000</span>
                </li>
                <li>Confirm and Complete Payment.</li>
              </ul>
            </div>
          </div>

          {showConfirmation && (
            <div className="rounded-lg bg-gray-800 p-6 text-center shadow-md">
              <h2 className="text-xl font-semibold text-green-400">
                ✅ Payment Successful!
              </h2>
              <p className="text-gray-300">Thank you for your payment.</p>
              <div className="mt-4 space-y-1 text-sm text-gray-400">
                <p>
                  Transaction ID:{' '}
                  <span className="font-semibold">123456XYZ</span>
                </p>
                <p>
                  Amount Paid: <span className="font-semibold">KES 25,000</span>
                </p>
                <p>
                  Date: <span className="font-semibold">1st November 2023</span>
                </p>
              </div>
              <button className="mt-4 rounded-md bg-blue-500 px-6 py-2 font-semibold transition hover:bg-blue-600">
                📄 Download Invoice
              </button>
            </div>
          )}

          {!showConfirmation && (
            <button
              onClick={handlePayment}
              className="w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Pay Now
            </button>
          )}
        </main>

        <footer className="mt-8 bg-gray-800 p-4 text-center text-sm text-gray-400">
          <p>
            Need Help?{' '}
            <a href="#" className="text-blue-400 hover:underline">
              Contact Support
            </a>
          </p>
          <p className="mt-2">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>{' '}
            |{' '}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>

      {/* <div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Tenant Name
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Phone Number
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Apartment
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Unit
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Paid Rent
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Active Status
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {initialTenants.map(tenant => (
                <tr
                  key={tenant.id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.tenantName}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.amount}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.phoneNumber}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.apartmentName}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.unitNumber}
                  </td>
                  <td className="border-b px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tenant.paidStatus
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tenant.paidStatus ? 'Paid' : 'Not Paid'}
                    </span>
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.date}
                  </td>
                  <td className="border-b px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tenant.activeStatus
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tenant.activeStatus ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="border-b px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        // onClick={() => handleEdit(tenant)}
                        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDelete(tenant.id)}
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}

export default Payments;
