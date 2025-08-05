import tireSVG from "../assets/tire.svg";
function LoadingError() {
    return (
        <>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <img style={{ height: "var(--fs-secondary-heading)" }} src={tireSVG}></img>
                <h1 className="fs-secondary-heading">Driver Rival System</h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "3rem", marginBlock: "4rem" }}>
                <div className="error-flag-container">
                    <h1>RED FLAG</h1>
                </div>
                <div className="error-text-container">
                    <h2>Failed to Fetch Data</h2>
                    <p>Sorry, an error has occurred while attempting to connect to the system. Please try reloading the page. If the issue persists, contact ———</p>
                </div>
                <button className="button" style={{ marginInline: "auto" }}>Reload</button>
            </div>

        </>
    );
}

export default LoadingError;