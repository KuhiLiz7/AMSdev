import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UsePayrent from '../features/payments/usePayrent';

import ConfirmPaid from '../features/payments/confirmPaid';

function PaymentForm() {
  const [hideForm, setHideForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { payrent, isPending } = UsePayrent();

  const { confirmPay, isPending: pendingConfirm } = ConfirmPaid();

  function onSubmit(data) {
    if (data.tel === '' || data.amount === '') return;
    const { tel, amount } = data;
    payrent(
      { tel, amount },
      {
        onSuccess: () => {
          setHideForm(true);
          reset({ tel: '', amount: '' });
        },
        onError: () => {
          /**Reset all input values when there is an error */
          reset({ tel: '', amount: '' });
        },
      },
    );
  }

  return (
    <div>
      {/* <div>
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-2xl font-bold">Tenant Payment Dashboard</h1>

          <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder="Search tenants..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
              />
              <select className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none md:w-1/4">
                <option value="">Filter by Month</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
              </select>
              <select className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none md:w-1/4">
                <option value="">Filter by Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Tenant Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Room #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4">John Doe</td>
                    <td className="whitespace-nowrap px-6 py-4">A-101</td>
                    <td className="whitespace-nowrap px-6 py-4">$850.00</td>
                    <td className="whitespace-nowrap px-6 py-4">March 2025</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">03/01/2025</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View Details
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4">Jane Smith</td>
                    <td className="whitespace-nowrap px-6 py-4">B-203</td>
                    <td className="whitespace-nowrap px-6 py-4">$900.00</td>
                    <td className="whitespace-nowrap px-6 py-4">March 2025</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                        Overdue
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">03/01/2025</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Total Due</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                $1,750.00
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Paid This Month
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                $850.00
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Overdue Payments
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <div>
          <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-4xl space-y-6 p-6">
              <div className="rounded-lg p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Payment Details</h2>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-400">Rent :</span>
                    <span className="font-semibold text-yellow-400">
                      KES 25,000
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Due by:</span>
                    <span className="font-semibold"> 5th November 2023</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Status:</span>
                    {/* <span
                      className={`font-semibold ${
                        paymentStatus === '' ? 'text-red-400' : 'text-green-400'
                      }`}
                    ></span> */}
                  </p>
                  <p>
                    <span className="text-gray-400">Apartment:</span>
                    <span className="font-semibold">12, Bingo Apartments</span>
                  </p>
                </div>
              </div>

              <div className="rounded-lg p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">
                  Choose Payment Method
                </h2>

                <div className="cursor-pointer rounded-md bg-green-500 p-4 transition hover:bg-green-600">
                  <h3 className="text-lg font-semibold text-slate-200">
                    {' '}
                    Pay via M-Pesa
                  </h3>
                  <p className="text-sm text-slate-100">
                    Secure and fast payment with M-Pesa.
                  </p>
                </div>

                <div className="mt-4 rounded-md bg-gray-700 p-4">
                  <h3 className="text-md font-semibold text-slate-300">
                    M-Pesa Payment Instructions:
                  </h3>
                  <ul className="mt-2 list-inside list-decimal space-y-1 text-sm text-gray-300">
                    <li>Go to M-Pesa on your phone.</li>
                    <li>Select &ldquo; Lipa na M-Pesa &rdquo;.</li>
                    <li>Buy good and services</li>
                    <li>
                      Enter Till Number:
                      <span className="text-yellow-400">174379</span>
                    </li>
                    <li>
                      Enter :<span className="text-yellow-400">KES 5,000</span>
                    </li>
                    <li>Confirm and Complete Payment.</li>
                  </ul>
                </div>
              </div>

              {/* <div className="rounded-lg p-6 text-center shadow-md">
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
                       Paid:{' '}
                      <span className="font-semibold">KES 25,000</span>
                    </p>
                    <p>
                      Date:{' '}
                      <span className="font-semibold">1st November 2023</span>
                    </p>
                  </div>
                  <button className="mt-4 rounded-md bg-blue-500 px-6 py-2 font-semibold transition hover:bg-blue-600">
                    📄 Download Invoice
                  </button>
                </div> */}
              <button
                type="submit"
                onClick={confirmPay}
                className="focus:shadow-outline mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Confirm Paid
              </button>

              {hideForm && (
                <div className="w-full rounded-lg bg-white p-6 shadow-md">
                  <h2 className="mb-4 text-lg font-semibold">Mpesa push</h2>
                  <form className="space-y-6" onClick={handleSubmit(onSubmit)}>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <select className="block w-24 appearance-none rounded-l border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-slate-500 focus:border-gray-500 focus:bg-white focus:outline-none">
                          <option value="+254">+254</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        id="tel"
                        pattern="[0-9]*"
                        className="block w-full appearance-none rounded-r border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        placeholder="Enter phone number"
                        {...register('tel')}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          KES
                        </span>
                        <input
                          type="number"
                          id="amount"
                          min="0"
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 pl-20 pr-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          placeholder="Enter"
                          {...register('amount')}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="focus:shadow-outline mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    >
                      Pay now
                    </button>
                  </form>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
