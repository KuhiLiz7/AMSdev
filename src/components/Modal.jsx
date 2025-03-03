import { XMarkIcon } from '@heroicons/react/16/solid';

function Modal({ children, onClose }) {
  return (
    <div
      id="modal"
      className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="modalTitle"
    >
      <div
        className="w-full max-w-screen-md rounded-lg bg-white p-6 shadow-lg"
        tabIndex="-1"
      >
        <button onClick={onClose} className="mb-2">
          <XMarkIcon className="h-5 w-5 fill-black" />
        </button>

        <div> {children}</div>
      </div>
    </div>
  );
}

export default Modal;
