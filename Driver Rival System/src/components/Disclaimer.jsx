import CheckeredFlag from "../assets/CheckeredFlag.svg"
import "./Disclaimer.css"

function Disclaimer({ title = "None", description = "" }) {
    return (
        <div className="disclaimer-container">
            {/* <CheckeredFlag></CheckeredFlag> */}
            <div>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "0.25rem" }}>
                    <rect width="8" height="8" x="0" y="0" fill="black" />
                    <rect width="8" height="8" x="8" y="0" fill="white" />
                    <rect width="8" height="8" x="16" y="0" fill="black" />
                    <rect width="8" height="8" x="0" y="8" fill="white" />
                    <rect width="8" height="8" x="8" y="8" fill="black" />
                    <rect width="8" height="8" x="16" y="8" fill="white" />
                    <rect width="8" height="8" x="0" y="16" fill="black" />
                    <rect width="8" height="8" x="8" y="16" fill="white" />
                    <rect width="8" height="8" x="16" y="16" fill="black" />
                </svg>
                <h1>{title}</h1>
            </div>
            <p>{description}</p>
        </div>
    );
}

export default Disclaimer;