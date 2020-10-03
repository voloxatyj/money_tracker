import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Navbar = () => {
	
	const [isHamburger, setIsHamburger] = useState(false)
	const authenticated = useSelector(state => state.user.authenticated)

	return (
		<nav>
			{authenticated ? (
			<>
				<div className="hamburger" onClick={() => setIsHamburger(!isHamburger)}>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
				</div>
				<ul className={isHamburger ? "nav-links open" : "nav-links"}>
					<li className={isHamburger ? "fade" : ""}><Link to="/">Home</Link></li>
					<li className={isHamburger ? "fade" : ""}><Link to="#">Categories</Link></li>
					<li className={isHamburger ? "fade" : ""}><Link to="#">Diagrams</Link></li>
				</ul>
			</>
			) : (
			<Link to="/authform" className="sign-in"><i className="fas fa-sign-in-alt fa-5x" style={{ color: "white" }}></i></Link>
			)}
		</nav>
	)
}
