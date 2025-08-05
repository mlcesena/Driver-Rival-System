import Header from "../Header";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css"
import "../../css/main.css"

function NavBar() {
    function setActivePage() {

    }

    return (
        <nav className="primary-navigation">
            <Link to="/" reloadDocument="true" className="navbar-brand">
                Driver Rival System
            </Link>
            <div className="divider"></div>
            <div className="navbar-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={setActivePage}>
                    Home
                </NavLink>
                <NavLink to="/drivers" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={setActivePage}>
                    Drivers
                </NavLink>
                <NavLink to="/teams" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={setActivePage}>
                    Teams
                </NavLink>
                <NavLink to="/tracks" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={setActivePage}>
                    Tracks
                </NavLink>
                <NavLink to="/info" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={setActivePage}>
                    Information
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={setActivePage}>
                    Contact
                </NavLink>
            </div>
            {/* <ul role="navigation" className="nav-list"> */}

            {/* <li className={``}>
                    <a title="Home"></a>
                    <span>Home</span>
                </li>
                <li className={``}>
                    <a title="Drivers"></a>
                    <span>Drivers</span>
                </li>
                <li className={``}>
                    <a title="Teams"></a>
                    <span>Teams</span>
                </li>
                <li className={``}>
                    <a title="Info"></a>
                    <span>Info</span>
                </li>
                <li className={``}>
                    <a title="Contact"></a>
                    <span>Contact</span>
                </li> */}
            {/* </ul> */}
        </nav >
    );
}

export default NavBar;