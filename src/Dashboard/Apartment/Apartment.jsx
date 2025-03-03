import { NavLink } from 'react-router-dom';
import AddApartment from '../../features/apartments/AddApartment';
import useAllApartments from '../../features/apartments/useAllApartments';
import useDeleteApartment from '../../features/apartments/useDeleteApartment';
import EditApartment from '../../features/apartments/EditApartment';
// import useAllApartments from '../../features/apartments/useAllApartments';

function Apartment() {
  const { isLoading, apartments, isError, error } = useAllApartments();

  /**This should be on each row,TODO: FIXED DURING REFACTORING */
  const { deleteApart, isPending } = useDeleteApartment();

  if (isLoading) return <p className="animate-pulse">Loading Apartments...</p>;

  if (apartments?.length === 0)
    return (
      <div className="space-y-4 py-4.5">
        <p className="font-semibold">
          There are no apartments,start by creating one.
        </p>
        <AddApartment type={'New apartment'} />
      </div>
    );
  return (
    <div className="">
      <h2 className="mb-4 block text-xl font-semibold">Apartments Overview</h2>
      <div className="mb-4 flex justify-between py-2">
        <AddApartment type={'New apartment'} />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Photo
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Number
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Floors
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Units
                </th>

                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {apartments?.map(apartment => (
                <tr
                  key={apartment._id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-2">
                    {apartment.photo ? (
                      <img
                        src={`http://localhost:8000/public/img/apartments/${apartment.photo}`}
                        alt={`${apartment.name} - ${apartment.apartmentType}`}
                        className="h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b px-4 py-2">
                    <div className="font-medium text-indigo-600">
                      {apartment.name}
                    </div>
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.apartmentNum}
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.location}
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.apartmentType}
                  </td>

                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.floors} Floors
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.units} Units
                  </td>

                  <td className="gap-2 space-y-1 border-b px-4">
                    <NavLink
                      to={`/apartment/${apartment.apartmentNum}`}
                      className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-indigo-600"
                    >
                      View
                    </NavLink>

                    <EditApartment
                      styles={
                        'rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-yellow-600'
                      }
                      type={'Edit'}
                      apartId={apartment?.apartmentNum}
                    />

                    <button
                      onClick={() => deleteApart(apartment.apartmentNum)}
                      // disabled={isPending}
                      className="inline-block rounded bg-red-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-800"
                    >
                      Delete
                    </button>
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

export default Apartment;
