import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

//ml-64 mt-15
export default function EmployeeLayout() {
  return (
    <>
      <Header />
      <div className="flex  ">
        <Sidebar  />
        <main className="w-full fixed left-64 top-15 p-6  min-h-screen">
          <Outlet /> {/* PAGE GOES HERE */}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
