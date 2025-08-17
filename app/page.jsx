"use client";
import Image from "next/image";
import Link from "next/link";
import Hero from "../assets/hhsvg.svg";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
export default function Home() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (user && isLoaded && isSignedIn) {
      router.push("/home");
    }
  }, [user, isLoaded]);
  return (
    <>
      <section
        className="bg-white lg:grid lg:place-content-center min-h-screen pt-10"
        data-aos={"fade-up"}
      >
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Simplify healthcare access and{" "}
              <strong className="text-[#007E85]"> maximize </strong>
              appointment confirmations.
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Guide patients through a seamless booking experience, reducing
              friction at every step to ensure higher appointment completion
              rates and improved satisfaction.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <Link
                className="flex items-center gap-2 rounded border  bg-[#007E85] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#539498]"
                href="/home"
              >
                <IoHomeOutline size={20} />{" "}
                <span className="inline">Home Page</span>
              </Link>

              <Link
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                href="/sign-in"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center -mt-12 md:-mt-20 p-4">
          <Image src={Hero} alt="Hero" width={1200} height={200} />
        </div>
      </section>
    </>
  );
}
