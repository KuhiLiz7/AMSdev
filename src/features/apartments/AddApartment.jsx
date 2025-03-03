import { useState } from 'react';
import Modal from '../../components/Modal';
import ApartmentForm from '../../components/ApartmentForm';

function AddApartment({ styles, type }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className={`${styles ? styles : 'rounded-full bg-green-200 px-4 py-2'}`}
      >
        {type}
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <ApartmentForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddApartment;
