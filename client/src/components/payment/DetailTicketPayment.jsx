const DetailPayment = ({ brand, typePerson, numberOfTicket, price }) => {
  return (
    <div className="w-full px-4 flex ">
      <h4 className="w-[60%] text-sm py-5">
        {brand} ({typePerson}) x {numberOfTicket}
      </h4>
      <h4 className="w-[40%] text-sm py-5">{price}</h4>
    </div>
  );
};

export default DetailPayment;
