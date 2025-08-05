import { useEffect, useRef, useState } from "react";
import "./Card.css"

function DriverCard({ firstName = "", lastName = "", team = "", number = "", acronym = "", image = "", primaryColor = "", accentColor = "", country = "" }) {
    const [alpha2, setAlpha2] = useState("xx");
    const [alpha3, setAlpha3] = useState("");
    const firstRef = useRef(firstName);
    const lastRef = useRef(lastName);

    useEffect(() => {
        getDriverNationality();
    }, [firstName, lastName, country])

    useEffect(() => {
        convertCountryCode();
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

    function convertCountryCode() {
        switch (alpha3) {
            case "ARG":
                setAlpha2("ar")
                break;
            case "AUS":
                setAlpha2("au")
                break;
            case "BRA":
                setAlpha2("br")
                break;
            case "CAN":
                setAlpha2("ca")
                break;
            case "CHN":
                setAlpha2("cn")
                break;
            case "EGY":
                setAlpha2("eg")
                break;
            case "FRA":
                setAlpha2("fr")
                break;
            case "DEU":
                setAlpha2("de")
                break;
            case "ITA":
                setAlpha2("it")
                break;
            case "JPN":
                setAlpha2("jp")
                break;
            case "MEX":
                setAlpha2("mx")
                break;
            case "MCO":
                setAlpha2("mc")
                break;
            case "NLD":
                setAlpha2("nl")
                break;
            case "NZL":
                setAlpha2("nz")
                break;
            case "ESP":
                setAlpha2("es")
                break;
            case "SWE":
                setAlpha2("ch")
                break;
            case "THA":
                setAlpha2("th")
                break;
            case "GBR":
                setAlpha2("gb")
                break;
            case "USA":
                setAlpha2("us")
                break;
            default:
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
                <div className="driver-img-container" style={{ "--racing-stripe-clr": accentColor }}>
                    <img className="driver-img" src={image}></img>
                </div>
                <div className="driver-card-footer">
                    <h1 className="driver-acronym">{acronym}</h1>
                    <div className="flag-container">
                        <span className={`fi fi-${alpha2} driver-flag`}></span>
                    </div>
                </div>
            </div >
        </div>

    );
}

export default DriverCard;