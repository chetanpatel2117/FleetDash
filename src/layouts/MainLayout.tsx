import Header from "../components/layout/Header.tsx";
import Sidebar from "../components/layout/Sidebar.tsx";
import { Outlet } from "react-router-dom";

function MainLayout () {
  return (
    <div className='min-h-screen flex bg-slate-900'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Header />

        <main className='flex-1 p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
