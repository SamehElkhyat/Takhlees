import React from "react";
import "../TeamSection/TeamSection.css";
import Cleints from "../TeamSection/2D.png";

const TeamSection = () => {
  return (
    <main className="Team-section">
      <section className="Team-section-right">
        <h1>خدمات تخليص جمركي سريعة وموثوقة لتسريع تجارتك الدولية</h1>
        <p>
          نحن هنا لنساعدك. نقدم خدمات تخليص
          جمركي احترافية تضمن لك الوصول السريع والمباشر إلى أسواقك الدولية بدون
          تأخير.
        </p>
      </section>

      <section className="Team-section-left">
        <img src={Cleints} alt="" />
      </section>
    </main>
  );
};

export default TeamSection;
