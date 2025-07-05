import React from "react";
import DocImg from "../../../assets/undraw_medicine_hqqg.svg";
import Bg from "../../../assets/DocBg.svg";
import ContainImg from "../../../assets/Container.svg";
import Link from "next/link";
import Image from "next/image";
import ResultsNum from "../../components/ResultsNum";
import ServicesCard from "../../components/ServicesCard";
import img1 from "../../../assets/img1.svg";
import img2 from "../../../assets/img2.svg";
import img3 from "../../../assets/img3.svg";
import img4 from "../../../assets/img4.svg";
import img5 from "../../../assets/img5.svg";
import img6 from "../../../assets/img6.svg";
import TeamCards from "../../components/TeamCards";
import teamImg1 from "../../../assets/team-1.svg";
import teamImg2 from "../../../assets/team-2.svg";
import teamImg3 from "../../../assets/team-3.svg";
import teamImg4 from "../../../assets/team-4.svg";
import teamImg5 from "../../../assets/team-5.svg";
import teamImg6 from "../../../assets/Doc.svg";
import TestimonialCard from "../../components/TestimonialCard";
import commentIm1 from "../../../assets/comment.svg";
import commentIm2 from "../../../assets/comment2.svg";
import commentIm3 from "../../../assets/comment3.svg";
import CarouselComponent from "../../components/Carousel";
export default function page() {
  return (
    <div>
      <section
        data-aos="fade-up"
        className="bg-white lg:grid lg:h-screen lg:place-content-center"
      >
        <div className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-24 flex flex-col-reverse  md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32 ">
          <div className="max-w-prose text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Providing Quality{" "}
              <span className="text-[#007E85]">Healthcare</span> for a{" "}
              <span className="text-[#6EAB36]">Brighter</span> and{" "}
              <span className="text-[#6EAB36]">Healthy</span> Future
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              At our hospital, we are dedicated to providing exceptional medical
              care to our patients and their families. Our experienced team of
              medical professionals, cutting-edge technology, and compassionate
              approach make us a leader in the healthcare industry
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
              <Link
                className="inline-block rounded border border-[#007E85] bg-[#007E85] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#2b8186] tracking-wider"
                href="/appointment"
              >
                Appointments
              </Link>
            </div>
          </div>

          <div className="relative m-2 ">
            <Image
              src={DocImg}
              alt="Doc"
              width={600}
              height={500}
              className="z-20 relative"
            />
          </div>
        </div>
      </section>
      <section className="my-8">
        <h1 className="text-center my-6 text-[#007E85] text-4xl font-semibold">
          Our results in numbers
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 my-8">
          <ResultsNum num={"99"} perc={"%"} title={"Customer satisfaction"} />
          <ResultsNum num={"15"} perc={"K"} title={"Online Patients"} />
          <ResultsNum num={"12"} perc={"K"} title={"Patients Recovered"} />
          <ResultsNum num={"240"} perc={"%"} title={"Company growth"} />
        </div>
        <section
          data-aos="fade-up"
          className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center"
        >
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-3xl font-bold text-[#007E85] md:text-3xl">
                You have lots of reasons to choose us
              </h2>

              <p className="text-[#555555] md:mt-4 block leading-relaxed">
                We combine expertise, compassion, and the latest technology to
                offer unparalleled care tailored just for you. From emergency
                services to preventive care, your health is our priority.
              </p>

              <ul className="mt-6 list-disc list-inside text-left text-[#007E85] space-y-2 font-semibold">
                <li>Experienced & compassionate medical team</li>
                <li>State-of-the-art diagnostic equipment</li>
                <li>Personalized treatment plans</li>
                <li>24/7 Emergency care availability</li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/appointment"
                  className="inline-block rounded-sm bg-gradient-to-r from-[#007E85] to-[#2b8186] px-12 py-3 text-sm font-medium text-white transition hover:from-[#2b8186] hover:to-[#005f60] focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>

          <Image
            alt="BG"
            src={ContainImg}
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
          />
        </section>
      </section>
      <section
        className=" py-12 px-6 rounded-xl my-12y mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-4xl text-center font-extrabold text-[#007E85] mb-8">
          Why Choose Our Hospital?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">
              Cutting-Edge Technology
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We utilize the latest medical equipment ensuring precise
              diagnostics and effective treatment plans.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Experienced Staff</h3>
            <p className="text-gray-700 leading-relaxed">
              Our team consists of highly qualified specialists dedicated to
              your well-being.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">
              Patient-Centered Care
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We believe in holistic care that respects your preferences and
              provides emotional support.
            </p>
          </div>
        </div>
      </section>
      <section className="my-12" data-aos="fade-up">
        <h1 className="text-center mt-2 text-[#007E85] text-4xl font-semibold">
          Services we provide{" "}
        </h1>
        <p className="text-[#555555aa] text-sm text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan.{" "}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
          <ServicesCard title={"Dental treatments"} img={img1} />
          <ServicesCard title={"Bones treatments"} img={img2} />
          <ServicesCard title={"Diagnosis"} img={img3} />
          <ServicesCard title={"Cardiology"} img={img4} />
          <ServicesCard title={"Surgery"} img={img5} />
          <ServicesCard title={"Eye care"} img={img6} />
        </div>
      </section>
      <section className="my-14" data-aos="fade-up">
        <h1 className="text-center mt-2 text-[#007E85] text-4xl font-semibold">
          Meet our team members{" "}
        </h1>
        <p className="text-[#555555aa] text-sm text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan.{" "}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 my-12">
          <TeamCards
            name={"John Carter"}
            job={"CEO & Co-Founder"}
            img={teamImg1}
          />
          <TeamCards
            name={"Sophie Moore"}
            job={"Dental specialist"}
            img={teamImg2}
          />
          <TeamCards name={"Matt Cannon"} job={"Orthopedic"} img={teamImg6} />
          <TeamCards name={"Andy Smith"} job={"Brain surgeon"} img={teamImg4} />
          <TeamCards
            name={"Lily Woods"}
            job={"Heart specialist"}
            img={teamImg5}
          />
          <TeamCards
            name={"Patrick Meyer"}
            job={"Eye specialist"}
            img={teamImg3}
          />
        </div>
      </section>
      <section className="my-14" data-aos="fade-up">
        <h1 className="text-center mt-2 text-[#007E85] text-4xl font-semibold">
          Testimonial
        </h1>
        <p className="text-[#555555aa] text-sm text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan.{" "}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-12">
          <TestimonialCard
            time={"31"}
            name={"John Carter"}
            comment={"“An amazing service”"}
            img={commentIm1}
          />
          <TestimonialCard
            time={"16"}
            name={"Sophie Moore"}
            comment={"“One of a kind service”"}
            img={commentIm2}
          />
          <TestimonialCard
            time={"24"}
            name={"Andy Smith"}
            comment={"“The best service”"}
            img={commentIm3}
          />
        </div>
      </section>
      <section className="my-14" data-aos="fade-up">
        <h1 className="text-center mt-2 text-[#007E85] text-4xl font-semibold">
          Trusted by 10,000+ companies around the world
        </h1>

        <div className="flex items-center justify-center w-full">
          <CarouselComponent />
        </div>
      </section>
    </div>
  );
}
