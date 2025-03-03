import AddUnit from '../../features/units/AddUnit';
import useDeleteUnit from '../../features/units/useDeleteUnit';
import useUnits from '../../features/units/useUnits';

// Dummy unit data, linked to apartments from previous examples
const initialUnits = [
  {
    id: 1,
    apartmentName: 'Serenity Towers',
    description: 'Spacious corner unit with city views',
    unitType: 'One-Bedroom',
    floor: 5,
    status: true, // true = Occupied, false = Vacant
  },
  {
    id: 2,
    apartmentName: 'Serenity Towers',
    description: 'Compact unit with balcony',
    unitType: 'Bedsitter',
    floor: 3,
    status: false, // Vacant
  },
  {
    id: 3,
    apartmentName: 'Green Oasis Villas',
    description: 'Luxury villa unit with private pool',
    unitType: 'Two-Bedroom',
    floor: 1,
    status: true, // Occupied
  },
  {
    id: 4,
    apartmentName: 'Coastal Haven Hotel',
    description: 'Beachfront suite with ocean view',
    unitType: 'Single',
    floor: 2,
    status: false, // Vacant
  },
];

function Units() {
  /**Fetching all units */
  const { data: units, isLoading, isError, error } = useUnits();

  /**Deleting a unit BUG:FIXME:THIS WILL BE FIXED DURING REFACTORING*/
  const { deleteunit, isPending } = useDeleteUnit();

  if (units?.length === 0)
    return (
      <div>
        <p>There are no units kindly add one.</p>
        <AddUnit />
      </div>
    );
  return (
    <div>
      <h2 className="mb-4 block text-xl font-semibold">Units Overview</h2>
      <div className="mb-4 flex justify-between py-2">
        <AddUnit />
      </div>

      <div>
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search units..."
            // value={searchTerm}
            // onChange={e => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div> */}
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                {/* <th
                  className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  // onClick={() => handleSort('apartmentName')}
                >
                  ID
                </th> */}
                <th
                  className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  // onClick={() => handleSort('apartmentName')}
                >
                  Apartment
                </th>
                <th
                  className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  // onClick={() => handleSort('description')}
                >
                  Description
                </th>
                <th
                  className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  // onClick={() => handleSort('unitType')}
                >
                  Unit Type
                </th>
                <th
                  className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  // onClick={() => handleSort('floor')}
                >
                  Floor
                </th>
                <th
                  className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  // onClick={() => handleSort('status')}
                >
                  Status
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {units?.map(unit => (
                <tr
                  key={unit._id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.apartmentUnit}
                  </td>
                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.description}
                  </td>

                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.unitType}
                  </td>
                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.floor}
                  </td>
                  <td className="border-b px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        unit.status
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {unit.status ? 'Occupied' : 'Vacant'}
                    </span>
                  </td>
                  <td className="border-b">
                    <div className="flex space-x-2">
                      <button
                        // onClick={() => handleEdit(unit)}
                        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteunit(unit._id)}
                        disabled={isPending}
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
        <div className="mt-4 flex justify-center space-x-2">
          {/* {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              // onClick={() => setCurrentPage(i + 1)}
              // className={`rounded px-3 py-1 ${
              //   // // currentPage === i + 1
              //   //   ? 'bg-indigo-500 text-white'
              //   //   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              // } transition duration-200`}
            >
              {i + 1}
            </button>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Units;
