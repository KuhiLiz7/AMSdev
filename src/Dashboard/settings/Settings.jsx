import AddUser from '../../features/users/AddUser';

/**Fake users */
const initialUsers = [
  {
    id: 1,
    firstName: 'Erick',
    lastName: 'Ngechu',
    email: 'ngerick003@gmail.com',
    phoneNumber: '0712345678',
    role: 'Tenant',
    gender: 'Male',
    activeStatus: true, // true = Active, false = Inactive
  },
  {
    id: 1,
    firstName: 'Vincent',
    lastName: 'Kibet',
    email: 'kibetvincent23@gmail.com',
    phoneNumber: '0712345678',
    role: 'Tenant',
    gender: 'Male',
    activeStatus: true, // true = Active, false = Inactive
  },
  {
    id: 1,
    firstName: 'Elizabeth',
    lastName: 'Mukuhi',
    email: 'elizam2@gmail.com',
    phoneNumber: '0712345678',
    role: 'Manager',
    gender: 'Female',
    activeStatus: true, // true = Active, false = Inactive
  },
  {
    id: 2,
    firstName: 'Mishek',
    lastName: 'Kamashu',
    email: 'kamashumishek@gmail.com',
    phoneNumber: '0723456789',
    role: 'Tenant',
    gender: 'Male',
    activeStatus: true, // Active
  },
  {
    id: 3,
    firstName: 'Leah',
    lastName: 'Marendi',
    email: 'marendileah@gmail.com',
    phoneNumber: '0734567890',
    role: 'Tenant',
    gender: 'Female',
    activeStatus: false,
  },
  {
    id: 4,
    firstName: 'Kennedy',
    lastName: 'Malanga',
    email: 'malangakennedy@gmail.com',
    phoneNumber: '0745678901',
    role: 'Manager',
    gender: 'Male',
    activeStatus: true,
  },
];

function Settings() {
  return (
    <div>
      <h2 className="block text-xl font-semibold">
        All accounts/users Overview
      </h2>
      <div className="mb-4 flex gap-4 py-2">
        <AddUser />
      </div>

      <div className="space-y-2">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  First Name
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Last Name
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Phone Number
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Gender
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
              {initialUsers.map(user => (
                <tr
                  key={user.id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.firstName}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.lastName}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.email}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.phoneNumber}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.role}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.gender}
                  </td>

                  <td className="border-b px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.activeStatus
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.activeStatus ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="border-b px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        // onClick={() => handleEdit(user)}
                        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDelete(user.id)}
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

export default Settings;
