import React from "react";
import img from "../../assets/contact.svg";
import Link from "next/link";
export default function ContactHeader() {
  return (
    <section
      className={`overflow-hidden bg-cover object-cover bg-center bg-no-repeat contact-page-header`}
    >
      <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="font-semibold text-4xl text-[#007E85]">
            Health<span className="text-[#6EAB36]">Care</span>
          </h2>{" "}
          <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            officia corporis quasi doloribus iure architecto quae voluptatum
            beatae excepturi dolores.
          </p>
          <div className="mt-4 sm:mt-8">
            <Link
              href="#"
              className="inline-block rounded-full bg-[#007E85] px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
