import React, {useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavbarLogo } from './layouts/NavbarLogo'

export const Navbar = () => {
	
	const [isHamburger, setIsHamburger] = useState(false)
	const authenticated = useSelector(state => state.user.authenticated)

	return (
    <nav>
      {authenticated ? (
        <>
          <div
            className="hamburger"
            onClick={() => setIsHamburger(!isHamburger)}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <ul className={isHamburger ? "nav-links open" : "nav-links"}>
            <li className={isHamburger ? "fade" : ""}>
              <NavLink exact to="/" activeClassName="selected">Home</NavLink>
            </li>
            <li className={isHamburger ? "fade" : ""}>
              <NavLink to="/table" activeClassName="selected">Table</NavLink>
            </li>
            <li className={isHamburger ? "fade" : ""}>
              <NavLink to="/diagrams" activeClassName="selected">Diagrams</NavLink>
            </li>
          </ul>
        </>
      ) : (
        <>
          <NavbarLogo />
          <Link to="/authform" className="sign-in">
            <i
              className="fas fa-sign-in-alt fa-5x"
              style={{ color: "white" }}
            ></i>
          </Link>
        </>
      )}
    </nav>
  );
}
