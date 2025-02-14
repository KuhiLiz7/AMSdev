import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import user from './../images/user-01.png';

function Header({ onToggleSideBar, isOpen }) {
  return (
    <header className="sticky top-0 z-999 border-b bg-white py-3 shadow-default">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-8">
          <button onClick={onToggleSideBar} className="max-md:block md:hidden">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 fill-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 fill-black" />
            )}
          </button>
          <Link to="/">
            <HomeIcon className="h-6 w-6 fill-black" />
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <button>
            <SunIcon className="h-5 w-5 fill-black" />
          </button>
          <button>
            <span>
              <BellIcon className="h-5 w-5 fill-black" />
            </span>
            <span></span>
          </button>
          <div className="flex items-center gap-4 px-6">
            <p className="flex flex-col text-right text-bgalt">
              <span className="text-sm font-bold">Erick Waltson</span>
              <span className="text-xs">Tenant</span>
            </p>
            <div className="h-10 w-10">
              <img src={user} alt="User1" />
            </div>
            <span>
              <ChevronDownIcon className="h-5 w-5 fill-black" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
