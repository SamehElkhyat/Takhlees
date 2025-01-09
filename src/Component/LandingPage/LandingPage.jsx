import React from "react";
import ship from '../LandingPage/ships.png'
import "./LandingPage.css";
import MainSection from "../MainSection/Mainsection";
import Footer from "../Footer/Footer.jsx";
import TeamSection from "../TeamSection/TeamSection.jsx";
import ClientsSection from "../ClientsSection/ClientsSection.jsx";

const LandingPage = () => {
  return <>

<header className="landing-header">

<section className="landing-page-left-section">
 <ul className="landing-page-ul">
 <h1>شركه التخليص للخدمات اللوجوستيه</h1>

   <li>
     <i class="fa-solid fa-check"></i> حل شامل للاستيراد والتصدير
   </li>
   <li>
     <i class="fa-solid fa-check"></i> ربط العملاء بالمخلصين المحترفين
   </li>
   <li>
     <i class="fa-solid fa-check"></i> تتبع الإجراءات والمعاملات
   </li>
   <li>
     <i class="fa-solid fa-check"></i> دفع إلكتروني آمن وشفاف
   </li>

   <button className="mt-5 pl-2 btn btn-success">خصائص اكثر</button>

 </ul>

</section>

<section className="landing-page-right-section">
 <img 
   src={ship} 
   alt="Logistics Ship" 
   style={{
     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
     borderRadius: '8px',
     objectFit: 'cover',
     transition: 'transform 0.3s ease',
     '&:hover': {
       transform: 'scale(1.02)'
     }
   }}
 />
</section>

</header>
<MainSection/>
<TeamSection/>
<ClientsSection/>
<Footer/>
  </>
};

export default LandingPage;
