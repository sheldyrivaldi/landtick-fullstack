import "../../assets/css/index.css";
import Jumbotron from "../../components/home/Jumbotron";
import Schedule from "../../components/schedule/Schedule";
import Footer from "../../components/Footer";

import Navbar from "../../components/navbar/Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <section id="content" className="px-20">
        <Schedule />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
