import { useForm } from 'react-hook-form';
import useGetApartment from '../features/apartments/useGetApartment';
import useEditApartment from '../features/apartments/useEditApartment';

function EditApartmentForm({ onCloseModal, apartId }) {
  // prettier-ignore
  const kenyanCounties = [
    'Nairobi','Mombasa','Kwale','Kilifi','Tana River','Lamu','Taita Taveta','Garissa','Wajir','Mandera','Marsabit','Isiolo','Meru','Tharaka-Nithi','Embu','Kitui','Machakos','Makueni','Nyandarua','Nyeri','Kirinyaga',"Murang'a",'Kiambu','Turkana','West Pokot','Samburu','Trans-Nzoia','Uasin Gishu','Elgeyo-Marakwet','Nandi','Baringo','Laikipia','Nakuru','Narok','Kajiado','Kericho','Bomet','Kakamega',
    'Vihiga','Bungoma', 'Busia', 'Siaya', 'Kisumu','Homa Bay','Migori','Kisii','Nyamira',
  ];
  const apartmentTypes = ['Flats', 'Plot', 'Hotel', 'Hostel'];

  /**Getting an apartment data for the apartment being edited*/
  const { data: apartment, isLoading } = useGetApartment(apartId);

  const { editApartment, isPending } = useEditApartment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**Our own function that we shall call on submit */
  function onSubmit(data) {
    const finalData = [apartId, data];
    editApartment(finalData);
  }

  return (
    <div>
      <form
        id="EditApartmentForm"
        className="space-y-6"
        // encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Apartment Name
          </label>
          <div className="flex-1">
            <input
              type="text"
              id="name"
              name="name"
              disabled={isPending}
              defaultValue={apartment?.name}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              {...register('name', {
                required: {
                  defaultValue: true,
                  message: 'Apartment should have a name.',
                },
                minLength: {
                  defaultValue: 5,
                  message: 'Apartment name should be greater than 5 char',
                },
              })}
              required
            />

            {errors.name && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Location (Kenyan County)
          </label>
          <div className="flex-1">
            <select
              id="location"
              name="location"
              disabled={isPending}
              defaultValue={apartment?.location}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              {...register('location', {
                required: {
                  defaultValue: true,
                  message: 'Select A location!',
                },
              })}
              required
            >
              <option defaultValue="">Select a County</option>
              {kenyanCounties.map(county => (
                <option key={county} defaultValue={county}>
                  {county}
                </option>
              ))}
            </select>
            {errors.location && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.location.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="floors"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Number of Floors
          </label>
          <div className="flex-1">
            <input
              type="number"
              id="floors"
              name="floors"
              disabled={isPending}
              defaultValue={apartment?.floors}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              required
              min="1"
              {...register('floors', {
                required: {
                  defaultValue: true,
                  message: 'Provide number of floors!',
                },
              })}
            />
            {errors.floors && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.floors.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="units"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Number of Units
          </label>
          <div className="flex-1">
            <input
              type="number"
              id="units"
              name="units"
              disabled={isPending}
              defaultValue={apartment?.units}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              required
              min="1"
              {...register('units', {
                required: {
                  defaultValue: true,
                  message: 'Provide number of units',
                },
              })}
            />
            {errors.units && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.units.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="apartmentType"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Apartment Type
          </label>
          <div className="flex-1">
            <select
              id="apartmentType"
              name="apartmentType"
              disabled={isPending}
              defaultValue={apartment?.apartmentType}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm invalid:border-red-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              required
              {...register('apartmentType', {
                required: {
                  defaultValue: true,
                  message: 'Select apartment Type!',
                },
              })}
            >
              <option defaultValue="">Select Apartment Type</option>
              {apartmentTypes.map(type => (
                <option key={type} defaultValue={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
            {errors.apartmentType && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.apartmentType.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-2 flex flex-col md:flex-row md:items-start md:gap-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            disabled={isPending}
            defaultValue={apartment?.description}
            className="mt-1 block h-20 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
            {...register('description')}
          />
        </div>

        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 md:w-2/3"
            // required
            {...register('photo')}
          />
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
            disabled={isPending}
            className="rounded bg-indigo-500 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-100"
          >
            Save Apartment
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditApartmentForm;
