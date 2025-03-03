const apartments = [
  { id: 1, name: 'Serenity Towers' },
  { id: 2, name: 'Green Oasis Villas' },
  { id: 3, name: 'Coastal Haven Hotel' },
  { id: 4, name: 'Campus Lodge' },
];

const units = [
  {
    id: 1,
    apartmentId: 1,
    number: 'A-101',
    description: 'Spacious corner unit with city views',
    unitType: 'One-Bedroom',
    floor: 5,
    status: false,
  }, // Vacant
  {
    id: 2,
    apartmentId: 1,
    number: 'A-102',
    description: 'Compact unit with balcony',
    unitType: 'Bedsitter',
    floor: 3,
    status: false,
  }, // Vacant
  {
    id: 3,
    apartmentId: 2,
    number: 'V-203',
    description: 'Luxury villa unit with private pool',
    unitType: 'Two-Bedroom',
    floor: 1,
    status: false,
  }, // Vacant
  {
    id: 4,
    apartmentId: 3,
    number: 'H-305',
    description: 'Beachfront suite with ocean view',
    unitType: 'Single',
    floor: 2,
    status: false,
  }, // Vacant
  {
    id: 5,
    apartmentId: 4,
    number: 'L-407',
    description: 'Student-friendly unit near campus',
    unitType: 'Bedsitter',
    floor: 1,
    status: false,
  }, // Vacant
];

function TenantUnit({ onCloseModal }) {
  return (
    <div>
      <form id="assignTenantForm" className="space-y-6">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="apartmentId"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Apartment
          </label>
          <select
            id="apartmentId"
            name="apartmentId"
            // value={formData.apartmentId}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
          >
            <option value="">Select an Apartment</option>
            {apartments.map(apt => (
              <option key={apt.id} value={apt.id}>
                {apt.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="unitId"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Unit
          </label>
          <select
            id="unitId"
            name="unitId"
            // value={formData.unitId}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
            // disabled={!formData.apartmentId}
          >
            <option value="">Select a Unit</option>
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.number} (Floor {unit.floor}, {unit.unitType})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="tenantName"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Tenant Name
          </label>
          <input
            type="text"
            id="tenantName"
            name="tenantName"
            // value={formData.tenantName}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            // value={formData.phoneNumber}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
            pattern="\d{10}"
            placeholder="e.g., 0712345678"
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Payment
          </label>
          <div className="mt-1 md:w-2/3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="paid"
                name="paid"
                // checked={formData.status}
                // onChange={handleInputChange}
                className="form-checkbox h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Paid</span>
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Unchecked = Not paid rent/deposit, Checked = Paid rent/deposit
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => onCloseModal()}
            className="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-indigo-500 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600"
          >
            Assign Tenant
          </button>
        </div>
      </form>
    </div>
  );
}

export default TenantUnit;
