import React from "react";
import "../ClientsSection/ClientsSection.css";
import RatingClient from "../ClientsSection/Clients (1).png";
import Group1 from "../ClientsSection/Group1.png";
import Group2 from "../ClientsSection/Group2.png";
import Group3 from "../ClientsSection/Group3.png";

const ClientsSection = () => {
  return (
    <>
      <main className="Globall-Clients-section">
        <section className="Clients-section">
          <h4>خدمه العميل</h4>
          <img src={Group1} alt="" />
          <div className="inside-card"></div>
          <div className="over-inside-card"></div>
        </section>

        <section className="Clients-section">
          <h4>سرعه التواصل للعميل</h4>
          <img src={Group2} alt="" />
          <div className="inside-card"></div>
          <div className="over-inside-card"></div>
        </section>

        <section className="Clients-section">
          <h4>سهوله الخدمه الفائقه</h4>
          <img src={Group3} alt="" />
          <div className="inside-card"></div>
          <div className="over-inside-card"></div>
        </section>
      </main>

      <img className="Rating-Clients" src={RatingClient} alt="" />
    </>
  );
};

export default ClientsSection;
