import { NavLink } from 'react-router-dom';

function NavLinkItem({ linkTo, children }) {
  return (
    <li className="hover:bg-bodydark2">
      <NavLink
        to={linkTo}
        className={({ isActive }) =>
          `flex items-center space-x-6 px-5.5 py-2 ${
            isActive ? 'bg-bodydark2' : 'bg-transparent'
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default NavLinkItem;
