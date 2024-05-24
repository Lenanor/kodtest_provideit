import { NavLink } from "react-router-dom";

import "./Navigation.css";

export default function Navigation() {
  return (
    <header>
      <nav className="Navigation">
        <ul className="Navigation_list">
          <li className="Navigation_list-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "Navigation_link--active" : undefined
              }
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
