import { useState } from 'react';
// import BreadCrumps from '../components/BreadCrumps';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { Outlet } from 'react-router-dom';

function AppLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  /**MEMOISATIONTBD */
  function handleToggleSideBar() {
    setIsOpen(c => !c);
  }

  return (
    <div className="bg-grey-1">
      {/* --- PAGE WRAPPER START */}
      <div className="flex h-screen overflow-hidden">
        {/* ----SIDENAV START */}
        <SideNav isOpen={isOpen} onToggleSideBar={handleToggleSideBar} />
        {/* ----SIDENAV END */}

        {/* --- CONTENT AREA START */}
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* --- HEADER START */}
          <Header onToggleSideBar={handleToggleSideBar} isOpen={isOpen} />
          {/* --- HEADER END */}

          {/* --- MAIN CONTENT START */}
          <main className="text-slate-900">
            <div className="mx-auto max-w-screen-2xl p-4">
              {/* <BreadCrumps /> */}

              {children}
              <Outlet />
            </div>
          </main>
          {/* --- MAIN CONTENT END */}
        </div>
        {/* --- CONTENT AREA END */}
      </div>
      {/* --- PAGE WRAPPER END */}
    </div>
  );
}

export default AppLayout;
