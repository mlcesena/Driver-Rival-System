import tireSVG from "../assets/tire.svg";
import { Link, NavLink } from "react-router-dom";

function LoadingError({ message = "" }) {
    return (
        <>
            {/* <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <img style={{ height: "var(--fs-secondary-heading)" }} src={tireSVG}></img>
                <h1 className="fs-secondary-heading">Driver Rival System</h1>
            </div> */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "3rem", marginBlock: "4rem" }}>
                <div className="error-flag-container">
                    <h1>RED FLAG</h1>
                </div>
                <div className="error-text-container">
                    <h2>Failed to Fetch Data</h2>
                    <p>Sorry, an error has occurred while attempting to connect to the system. Please try reloading the page. If the issue persists, send us a message via the contact page.</p>
                </div>
                <p style={{ marginInline: "auto" }}>{`[ Error: ${message} ]`}</p>
                <div style={{ marginInline: "auto", display: "flex", gap: "3rem" }}>
                    <Link reloadDocument={true}>
                        <button className="button">Reload</button>
                    </Link>
                    <NavLink to={"/contact"}>
                        <button className="button" data-type="inverse">Contact</button>
                    </NavLink>
                </div>
            </div>

        </>
    );
}

export default LoadingError;