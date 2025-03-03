import { useNavigate, useParams } from 'react-router-dom';
import useGetApartment from '../../features/apartments/useGetApartment';
import useDeleteApartment from '../../features/apartments/useDeleteApartment';
import EditApartment from '../../features/apartments/EditApartment';

function ApartmentOverview() {
  // Get apartment ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  /**Fetch one apartment data */
  const { data: apartment, isLoading } = useGetApartment(id);

  /**Delete an apartment */
  const { deleteApart, isPending } = useDeleteApartment(id);

  if (isLoading) return <p className="animate-pulse">Loading Apartment...</p>;

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 text-center text-gray-700">
        Apartment not found.
      </div>
    );
  }
  return (
    <div>
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/apartment')}
            className="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            Back to Apartments
          </button>
          <h1 className="text-3xl font-bold text-indigo-600">
            Apartment Overview
          </h1>
          <div></div>
        </div>

        <img
          src={`http://localhost:8000/public/img/apartments/${apartment.photo}`}
          alt={`${apartment.name} - ${apartment.apartmentType}`}
          className="mb-6 h-64 w-full rounded-lg object-cover"
        />

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Name:</h2>
              <p className="text-gray-700">{apartment.name}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Apartment Number:
              </h2>
              <p className="text-gray-700">{apartment.apartmentNum}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Location:</h2>
              <p className="text-gray-700">{apartment.location}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Type:</h2>
              <p className="text-gray-700">{apartment.apartmentType}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Floors:</h2>
              <p className="text-gray-700">{apartment.floors}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Units:</h2>
              <p className="text-gray-700">{apartment.units}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Description:
            </h2>
            <p className="leading-relaxed text-gray-700">
              {apartment.description}
            </p>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <EditApartment
              styles={
                'rounded bg-yellow-500 px-4 py-2 text-white transition duration-300 hover:bg-yellow-600'
              }
              type={'Edit'}
              apartId={apartment.apartmentNum}
            />

            <button
              onClick={deleteApart}
              disabled={isPending}
              className="rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApartmentOverview;
