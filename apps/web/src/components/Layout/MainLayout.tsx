import Header from "@/components/Layout/Header";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center">
      <Header />
      <main className="mt-44 flex py-7 md:mt-16 px-0 md:px-8 container lg:px-8 xl:px-0 justify-center md:justify-start">
        <Sidebar />
        <div className="mx-8 h-full w-full md:ml-[300px] lg:ml-[360px]">
          {children}
        </div>
      </main>
    </div>
  );
}
