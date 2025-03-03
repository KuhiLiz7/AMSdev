/* eslint-disable no-unused-vars */
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-dvh items-center justify-center bg-slate-700 p-4">
      <div className="flex flex-col space-y-2 rounded-sm bg-slate-200 p-18 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-800">
          Something went wrong!
        </h1>
        <p className="text-red-700">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-slate-700 p-2 text-slate-100"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
