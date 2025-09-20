import React from "react";
import Hero from "../../components/Hero";
import Statics from "../../components/Statics";
import WhyChoose from "../../components/WhyChoose";
import Services from "../../components/Services";
import Team from "../../components/Team";
import Testimonial from "../../components/Testimonial";
import Numbers from "../../components/Numbers";
import AppDownload from "../../components/AppDownload";
import FinalCTA from "../../components/FinalCTA";
export default function page() {
  return (
    <div>
      <Hero />
      <Statics />
      <WhyChoose />
      <Services />
      <Team />
      <AppDownload />
      <Testimonial />
      <Numbers />
      <FinalCTA />
    </div>
  );
}
