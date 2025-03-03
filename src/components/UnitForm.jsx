import { useForm } from 'react-hook-form';
import useUnit from '../features/units/useUnit';

// Dummy data
const apartments = [
  { id: 1, name: 'Serenity Towers' },
  { id: 2, name: 'Green Oasis Villas' },
  { id: 3, name: 'Coastal Haven Hotel' },
  { id: 4, name: 'Campus Lodge' },
];

function UnitForm({ onCloseModal }) {
  const unitTypes = ['bedsitter', 'single', 'one-bedroom', 'two-bedroom'];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { newUnit, isPending } = useUnit();

  function onSubmit(data) {
    newUnit(data, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }
  return (
    <div>
      <form
        id="unitForm"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="apartmentName"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Apartment
          </label>
          <select
            id="apartmentUnit"
            name="apartmentUnit"
            // value={formData.apartmentName}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
            {...register('apartmentUnit')}
          >
            <option value="">Select an Apartment</option>
            {apartments.map(apt => (
              <option key={apt.id} value={apt.name}>
                {apt.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            // value={formData.description}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('description')}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="unitType"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Unit Type
          </label>
          <select
            id="unitType"
            name="unitType"
            // value={formData.unitType}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('unitType')}
          >
            <option value="">Select Unit Type</option>
            {unitTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="floor"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Floor
          </label>
          <input
            type="number"
            id="floor"
            name="floor"
            // value={formData.floor}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('floor')}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Status
          </label>
          <div className="mt-1 md:w-2/3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="status"
                name="status"
                // checked={formData.status}
                // onChange={handleInputChange}
                className="form-checkbox h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register('status')}
              />
              <span className="ml-2 text-gray-700">Occupied</span>
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Unchecked = Vacant, Checked = Occupied
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => onCloseModal?.()}
            className="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-indigo-500 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600"
            disabled={isPending}
          >
            Save Unit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UnitForm;
