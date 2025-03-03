import { useState } from 'react';
import Modal from '../../components/Modal';
import EditApartmentForm from '../../components/EditApartmentForm';

function EditApartment({ styles, type, apartId = null }) {
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
          <EditApartmentForm
            onCloseModal={() => setIsOpenModal(false)}
            apartId={apartId}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditApartment;
