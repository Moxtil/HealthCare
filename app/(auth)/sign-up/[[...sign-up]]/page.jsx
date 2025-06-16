import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import img from "../../../../assets/contact.svg";
export default function Page() {
  return (
    <>
      <section className="overflow-hidden bg-gray-50 md:grid md:grid-cols-3 p-5 gap-8 flex flex-col-reverse items-center justify-center">
        <SignUp forceRedirectUrl="/" />

        <Image
          alt="Sign-Up"
          src={img}
          width={500}
          height={350}
          className="h-56 w-full object-cover sm:h-full col-span-2 -order-1 m-2"
        />
      </section>
    </>
  );
}
