import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
  return (
    <>
      <main className="min-h-screen flex md:flex-row justify-center items-center gap-6 p-5 overflow-hidden sign-up">
        <section className="w-full">
          <SignUp forceRedirectUrl="/" />
        </section>
      </main>
    </>
  );
}
