import React from "react";

const Jumbotron = () => {
  return (
    <section id="jumbotron" className="w-full h-[22rem] pt-[44px] bg-gradient-to-l from-strong-pink to-soft-pink ">
      <div className="container flex w-full justify-between pl-20 pr-16">
        <div className="py-14">
          <h1 className="font-avenir font-semibold text-4xl text-white ">Selamat Pagi, Ticket Seekers !</h1>
          <h3 className="font-avenir text-lg text-white ml-2 mt-3">Ingin Pulkam dengan Good Deal ?</h3>
          <h3 className="font-avenir text-lg text-white ml-2 mt-0.5">Masuk atau Daftar Sekarang ! !</h3>
        </div>
        <div className="ml-24 relative py-10">
          <img className="absolute top-7 -left-6" src="/src/assets/images/gambar-depan.png" alt="gambar-depan" />
          <img src="/src/assets/images/gambar-belakang.png" alt="gambar-belakang" />
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
