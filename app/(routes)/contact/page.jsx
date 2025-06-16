import ContactForm from "../../components/ContactForm";
import ContactHeader from "../../components/ContactHeader";
import React from "react";

export default function Page() {
  return (
    <main>
      <section data-aos={"fade-up"}>
        <ContactHeader />
        <ContactForm />
      </section>
    </main>
  );
}
