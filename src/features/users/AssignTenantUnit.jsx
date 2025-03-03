import { useState } from 'react';
import Modal from '../../components/Modal';
import TenantUnit from '../../components/TenantUnit';

function AssignTenantUnit() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded-full bg-green-200 px-4 py-2"
      >
        Assign Unit Tenant
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <TenantUnit onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AssignTenantUnit;
