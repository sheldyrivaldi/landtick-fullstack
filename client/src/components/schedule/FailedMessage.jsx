const FailedMessage = ({ dropModal }) => {
  const handleClickDropModal = () => {
    dropModal();
  };

  return (
    <>
      <div className="w-screen h-screen fixed flex justify-center items-center">
        <div onClick={handleClickDropModal} className="w-screen h-screen inset-0 absolute m-0 p-0 flex justify-center bg-black opacity-30"></div>
        <div className="bg-white w-1/2 py-2 z-10 relative rounded shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h6 className="text-center">Silahkan login terlebih dahulu!</h6>
        </div>
      </div>
    </>
  );
};

export default FailedMessage;
