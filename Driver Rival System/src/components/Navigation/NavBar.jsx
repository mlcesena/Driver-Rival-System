import Header from "../Header";
import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css"
import "../../css/main.css"

function NavBar() {
    const [expanded, setExpanded] = useState(false);
    const [collapseByResize, setCollapseByResize] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpoint = 59 * 16;
    const navRef = useRef();
    const linkRef = useRef();
    const [showOptions, setShowOptions] = useState(false);

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
        const handleDocumentClick = (e) => {
            if (navRef.current && !navRef.current.contains(e.target) && expanded) {
                document.querySelector("main").classList.remove("blur-active");
                setExpanded(false);
            }
        }
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [expanded])

    useEffect(() => {
        if (windowWidth > breakpoint) {
            setExpanded(true);
            setCollapseByResize(false);
            setShowOptions(false);
            document.querySelector("main").classList.remove("blur-active");
        }
        else if (windowWidth <= breakpoint) {
            setExpanded(false);
            setShowOptions(false);
            setCollapseByResize(true);
            document.querySelector("main").classList.remove("blur-active");
        }
    }, [windowWidth]);

    useEffect(() => {
        if (!expanded && !collapseByResize && linkRef.current) {
            linkRef.current.animate(
                [
                    { maxHeight: "500px", },
                    { maxHeight: "0px", }
                ],
                { duration: 250, easing: "ease-in-out" }
            );

            setTimeout(() => {
                if (linkRef.current)
                    linkRef.current.style.maxHeight = "0px";
                setShowOptions(false);
            }, 250);
        }
        else if (expanded && !collapseByResize) {
            setShowOptions(true);
        }
    }, [expanded]);

    useEffect(() => {
        if (showOptions && linkRef.current) {
            linkRef.current.style.display = "";
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
    }, [showOptions])

    function handleExpansion() {
        if (windowWidth <= breakpoint) {
            setExpanded(!expanded)
            document.querySelector("main").classList.toggle("blur-active");
        }
        else {
            setExpanded(true)
            document.querySelector("main").classList.remove("blur-active");
        }
        setCollapseByResize(false);
    }

    return (
        <>
            <nav className="primary-navigation" ref={navRef}>
                {windowWidth > breakpoint ?
                    <div className="nav-row">
                        <div className="navbar-links">
                            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                                Home
                            </NavLink>
                            <NavLink to="/drivers" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                                Drivers
                            </NavLink>
                            <NavLink to="/teams" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                                Teams
                            </NavLink>
                        </div>

                        <Link to="/" reloadDocument="true" className="navbar-brand">
                            Driver Rival System
                        </Link>

                        <div className="navbar-links" style={{ justifyContent: "flex-end" }}>
                            <NavLink to="/tracks" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                                Tracks
                            </NavLink>
                            <NavLink to="/info" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                                About
                            </NavLink>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                                Contact
                            </NavLink>
                        </div>
                    </div>
                    :
                    <>
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

                        {showOptions && <div className="navbar-links" ref={linkRef}>
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
                                About
                            </NavLink>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active-page" : "nav-link"} onClick={handleExpansion}>
                                Contact
                            </NavLink>
                        </div>}
                    </>}
                <div className="divider"></div>
            </nav >
        </>
    );
}

export default NavBar;