import React from "react";
import "../MainSection/Mainsection.css";
import Cleints from "../MainSection/2D.png";

const MainSection = () => {
  return (
    <main className="main-section">
      <section className="main-section-right">
        <h1>حول شركه تخليص</h1>
        <p>
          تخليص منصة مبتكرة تسهل عمليات التخليص الجمركي يربط التطبيق العملاء
          بمخلصين ووكلاء خدمات معتمدين تحت سقف واحد. باستخدام تقنيات الذكاء
          الاصطناعي والأتمتة. تضمن “تخليص” كفاءة وسرعة في الإجراءات، بالإضافة
          إلى توفير وسائل دفع إلكترونية آمنة وشفافة.
        </p>
      </section>

      <section className="main-section-left">
        <img src={Cleints} alt="" />
      </section>
    </main>
  );
};

export default MainSection;
