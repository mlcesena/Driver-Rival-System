import Header from "../Header";
import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css"
import "../../css/main.css"

function NavBar() {
    const [expanded, setExpanded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpoint = 50 * 16;
    const linkRef = useRef();


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > breakpoint && !expanded) {
            setExpanded(true);
            document.querySelector("main").classList.remove("blur-active");
        }
        else if (windowWidth <= breakpoint && expanded) {
            setExpanded(false);
            document.querySelector("main").classList.remove("blur-active");
        }
    }, [windowWidth]);

    useEffect(() => {
        if (linkRef.current) {
            if (!expanded) {
                linkRef.current.animate(
                    [
                        { maxHeight: "500px", },
                        { maxHeight: "0px", }
                    ],
                    { duration: 250, easing: "ease-in-out" }
                );

                setTimeout(() => {
                    linkRef.current.style.maxHeight = "0px";
                    // setShowOptions(false);
                    linkRef.current.style.display = expanded ? "" : "none";
                }, 250);
            }
            else {
                linkRef.current.style.display = expanded ? "" : "none";
                linkRef.current.style.maxHeight = "0px";
                linkRef.current.animate(
                    [
                        { maxHeight: "0px", },
                        { maxHeight: "500px", }
                    ],
                    { duration: 250, easing: "ease-in-out" }
                );

                linkRef.current.style.maxHeight = "500px";
            }


        }
    }, [expanded]);

    function handleExpansion() {
        if (windowWidth <= breakpoint) {
            setExpanded(!expanded)
            document.querySelector("main").classList.toggle("blur-active");

        }
        else {
            setExpanded(true)
            document.querySelector("main").classList.remove("blur-active");

        }
    }

    return (
        <>
            <nav className="primary-navigation">
                <div className="nav-header-container">
                    {windowWidth <= breakpoint && <button className="nav-btn" onClick={handleExpansion}>
                        <span className="material-symbols-outlined">
                            {expanded ? "close" : "menu"}
                        </span>
                    </button>}
                    <Link to="/" reloadDocument="true" className="navbar-brand">
                        Driver Rival System
                    </Link>

                </div>

                <div className="divider"></div>

                <div className="navbar-links" ref={linkRef}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                        Home
                    </NavLink>
                    <NavLink to="/drivers" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                        Drivers
                    </NavLink>
                    <NavLink to="/teams" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                        Teams
                    </NavLink>
                    <NavLink to="/tracks" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                        Tracks
                    </NavLink>
                    <NavLink to="/info" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                        Information
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                        Contact
                    </NavLink>
                </div>
            </nav >
        </>
    );
}

export default NavBar;