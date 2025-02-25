import { useState } from 'react';
import { useLogin } from '../features/authentication/useLogin';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }
  return (
    <div className="login-page flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Sign In to AMS
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-slate-800 outline-none transition-all invalid:text-red-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 invalid:focus:border-red-600 invalid:focus:ring-red-600"
              placeholder="your@email.com"
              required
              value={email}
              disabled={isPending}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 invalid:focus:border-red-600 invalid:focus:ring-red-600"
              placeholder="••••••••"
              required
              min="5"
              value={password}
              disabled={isPending}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label> */}
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>

          <button
            disabled={isPending}
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:bg-indigo-200"
          >
            Sign In
          </button>
        </form>

        {/* <div className="mt-6 text-center text-sm text-gray-600">
          Dont have an account?
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
