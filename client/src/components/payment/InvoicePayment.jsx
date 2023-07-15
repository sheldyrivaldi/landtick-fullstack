const InvoicePayment = ({ NIK, name, telp, email }) => {
  return (
    <div>
      <div className="pl-8 w-full grid grid-cols-4">
        <div className="text-md text-soft py-1">{NIK}</div>
        <div className="text-md text-soft pl-5 py-1">{name}</div>
        <div className="text-md text-soft py-1">{telp}</div>
        <div className="text-md text-soft py-1">{email}</div>
      </div>
    </div>
  );
};

export default InvoicePayment;
