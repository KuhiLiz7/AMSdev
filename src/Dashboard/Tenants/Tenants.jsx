import AddUser from '../../features/users/AddUser';
import AssignTenantUnit from '../../features/users/AssignTenantUnit';
import useUsers from '../../features/users/useUsers';

/**Fake tenants data but will be deleted later on */
// const initialTenants = [
//   {
//     id: 1,
//     tenantName: 'John Doe',
//     email: 'john.doe@example.com',
//     phoneNumber: '0712345678',
//     apartmentName: 'Serenity Towers',
//     unitNumber: 'A-101',
//     paidStatus: true, // true = Paid, false = Not Paid
//     activeStatus: true, // true = Active, false = Inactive
//   },
//   {
//     id: 2,
//     tenantName: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     phoneNumber: '0723456789',
//     apartmentName: 'Green Oasis Villas',
//     unitNumber: 'V-203',
//     paidStatus: false, // Not Paid
//     activeStatus: true, // Active
//   },
//   {
//     id: 3,
//     tenantName: 'Michael Johnson',
//     email: 'michael.j@example.com',
//     phoneNumber: '0734567890',
//     apartmentName: 'Coastal Haven Hotel',
//     unitNumber: 'H-305',
//     paidStatus: true, // Paid
//     activeStatus: false, // Inactive
//   },
//   {
//     id: 4,
//     tenantName: 'Sarah Williams',
//     email: 'sarah.w@example.com',
//     phoneNumber: '0745678901',
//     apartmentName: 'Campus Lodge',
//     unitNumber: 'L-407',
//     paidStatus: false, // Not Paid
//     activeStatus: true, // Active
//   },
// ];

function Tenants() {
  const { allusers, isLoading, error } = useUsers();

  if (!allusers) return <p>There are no users.</p>;
  return (
    <div>
      <h2 className="mb-4.5 block text-xl font-semibold">Tenants Overview </h2>
      <div className="mb-4 flex gap-4 py-2">
        <AddUser />
        <AssignTenantUnit />
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Tenant Name
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
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
                  Active Status
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allusers.map(tenant => (
                <tr
                  key={tenant.id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.firstName}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.email}
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
      </div>
    </div>
  );
}

export default Tenants;
