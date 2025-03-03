import { useState } from 'react';
import Modal from '../../components/Modal';
import UnitForm from '../../components/UnitForm';

function AddUnit() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded-full bg-green-200 px-4 py-2"
      >
        Add Unit
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <UnitForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddUnit;
