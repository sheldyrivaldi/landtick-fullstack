import TransactionItem from "./transaction-item";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";
import { API } from "../../config/api";
import Footer from "../Footer";
import Navbar from "../navbar/Navbar";

const Transactions = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const { data: transactions, refetch } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data.transaction;
  });

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/transaction/${id}`);
      refetch();
    } catch (error) {
      console.log("Delete failed!", error);
    }
  });

  const handleConfirmUpdate = () => {
    setConfirmUpdate(true);
    refetch();
  };

  const confirmDeleteById = (id) => {
    setIdDelete(id);
    setConfirmDelete(true);
  };

  useEffect(() => {
    if (confirmDelete) {
      deleteById.mutate(idDelete);
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  return (
    <>
      <Navbar />
      <section id="list-transactions" className="min-h-[78vh] pt-32 px-20">
        <h2 className="font-medium text-4xl pl-3">List Transaksi</h2>
        <div className="w-full h-full my-10">
          <div className="flex flex-col">
            <div className="w-full grid grid-cols-6 py-5 border-b border-black">
              <div className="text-sm px-1">No.</div>
              <div className="text-sm px-1">Users</div>
              <div className="text-sm px-1">Tiket</div>
              <div className="text-sm px-1">Bukti Transfer</div>
              <div className="text-sm px-1">Status Payment</div>
              <div className="text-sm px-1">Action</div>
            </div>
            {transactions?.map((item, index) => (
              <TransactionItem
                key={item.id}
                id={item.id}
                no={index + 1}
                user={item.user.fullname}
                ticket={item.ticket.start_station.name + " - " + item.ticket.destination_station.name}
                proof="Midtrans"
                status={item.status}
                delete={() => confirmDeleteById(item.id)}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Transactions;
