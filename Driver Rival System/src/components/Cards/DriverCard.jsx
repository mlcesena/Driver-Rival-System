import { useEffect, useRef, useState } from "react";
import { convertCountryCode } from "../../services/GlobalServices";
import "./Card.css"

function DriverCard({
    firstName = "First",
    lastName = "Last",
    team = "No Team",
    number = "0",
    acronym = "---",
    image = "",
    primaryColor = "var(--clr-neutra-400)",
    accentColor = "var(--clr-neutra-400)",
    country = "",
    driverData = [],
    reverse = false
}) {
    const [alpha2, setAlpha2] = useState("xx");
    const [alpha3, setAlpha3] = useState("");
    const aboutTitles = [
        "Date of Birth",
        "Nationality",
        "Number of Seasons",
        "Career Race Wins",
        "Career Points"
    ];

    useEffect(() => {
        getDriverNationality();
    }, [firstName, lastName, country])

    useEffect(() => {
        setAlpha2(convertCountryCode(alpha3));
    }, [alpha3])

    function getDriverNationality() {
        const name = `${firstName} ${lastName}`

        switch (name) {
            case "Max Verstappen":
                setAlpha3("NLD");
                break;
            case "Lando Norris":
            case "Oliver Bearman":
            case "Lewis Hamilton":
            case "George Russell":
                setAlpha3("GBR");
                break;
            case "Gabriel Bortoleto":
                setAlpha3("BRA");
                break;
            case "Isack Hadjar":
            case "Esteban Ocon":
            case "Pierre Gasly":
                setAlpha3("FRA");
                break;
            case "Kimi Antonelli":
                setAlpha3("ITA");
                break;
            case "Carlos Sainz":
            case "Fernando Alonso":
                setAlpha3("ESP");
                break;
            case "Charles Leclerc":
                setAlpha3("MCO");
                break;
            case "Lance Stroll":
                setAlpha3("CAN");
                break;
            case "Yuki Tsunoda":
                setAlpha3("JPN");
                break;
            case "Alexander Albon":
                setAlpha3("THA");
                break;
            case "Nico Hulkenberg":
                setAlpha3("DEU");
                break;
            case "Liam Lawson":
                setAlpha3("NZL");
                break;
            case "Franco Colapinto":
                setAlpha3("ARG");
                break;
            case "Oscar Piastri":
                setAlpha3("AUS");
                break;
            default:
                setAlpha3("");
                break;
        }
    }

    return (
        <div className="card-wrapper" style={{ backgroundColor: `${primaryColor}` }}>
            <div className="card driver-card" style={{ backgroundColor: `${primaryColor}` }}>
                <div className="driver-card-header">
                    <div className="driver-card-title">
                        <h1>{`${firstName} ${lastName}`}</h1>
                        <h2>{team}</h2>
                    </div>
                    <label className="driver-number" style={{ backgroundColor: `${accentColor}` }}>{number}</label>
                </div>
                {!reverse ?
                    <div className="card-body" style={{ "--racing-stripe-clr": accentColor }}>
                        <div className="card-img-container" style={{ "--container-bg-clr": accentColor }} >
                            <img
                                className="card-img"
                                data-type="driver"
                                src={image}
                                alt={`Photo of ${firstName} ${lastName}`}></img>
                        </div>
                    </div> :
                    <>
                        <div className="divider" style={{ "--divider-color": accentColor, "--divider-margin": "0.75rem" }}></div>
                        <div className="card-info-body">
                            {aboutTitles.map((title, idx) => (
                                <span>
                                    <h2 className="ff-body fw-bold">{title}</h2>
                                    <p className="ff-body">{driverData[idx] ?? "Null"}</p>
                                </span>
                            ))}
                        </div>
                    </>
                }
                <div className="driver-card-footer">
                    <h1 className="driver-acronym">{acronym}</h1>
                    <div className="flag-container">
                        <span className={`fi fi-${alpha2} driver-flag`}></span>
                    </div>
                </div>
            </div >
        </div >

    );
}

export default DriverCard;