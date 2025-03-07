import { useForm } from 'react-hook-form';
import useNewUser from '../features/users/useNewUser';

const roles = ['manager', 'admin', 'tenant', 'caretaker'];
const genders = ['Male', 'Female'];

function UserForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { newUser, isPending } = useNewUser();

  function onSubmit(data) {
    newUser(data, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <div>
      <form
        id="userForm"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            // value={formData.firstName}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('firstName', {
              required: {
                value: true,
                message: 'A user must have a username!',
              },
            })}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            // value={formData.lastName}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('lastName', {
              required: {
                value: true,
                message: 'A user must have a username!',
              },
            })}
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
            placeholder="user@gmail.com"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('email', {
              required: {
                value: true,
                message: 'A user must have a username!',
              },
            })}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value="testuser1234"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            disabled={'true'}
            {...register('password')}
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Password Confirm
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value="testuser1234"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            disabled={'true'}
            {...register('passwordConfirm')}
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
            {...register('phoneNumber', {
              required: {
                value: true,
                message: 'A user must have a valid phonenumber!',
              },
            })}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            // value={formData.role}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('role', {
              required: {
                value: true,
                message: 'A user must have a role',
              },
            })}
          >
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            // value={formData.gender}
            // onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('gender', {
              required: {
                value: true,
                message: 'A user must have a gender type!',
              },
            })}
          >
            <option value="">Select Gender</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
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
            Save User
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
