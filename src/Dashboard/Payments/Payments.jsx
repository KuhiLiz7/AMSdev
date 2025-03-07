import PaymentForm from '../../components/PaymentForm';
import useUser from '../../features/authentication/useUser';

function Payments() {
  // const { currentUser, isLoading, error } = useUser();
  // const { payrent, isLoading } = usePayment;
  const currentUser = { role: 'tenant' };

  if (currentUser.role === 'tenant') {
    return (
      <div>
        <PaymentForm />
        {/* <p>{currentUser.firstName} Please pay rent.</p>
        <button className="rounded-sm bg-slate-800 p-4 text-slate-100">
          Pay rent
        </button> */}
      </div>
    );
  }
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}

export default Payments;
