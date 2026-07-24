import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout () {
  return (
    <div className='flex h-screen overflow-hidden bg-slate-900'>
      <Sidebar />

      <div className='flex min-h-0 flex-1 flex-col'>
        <Header />
        <main className='flex-1 overflow-y-auto overflow-x-hiddden bg-slate-900'>
          <div className='mx-auto w-full max-w-[1600px] p-6'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
