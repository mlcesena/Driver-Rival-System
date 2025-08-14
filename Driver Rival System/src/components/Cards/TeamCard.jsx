import { useEffect, useRef, useState } from "react";
import { convertCountryCode } from "../../services/GlobalServices";
import "./Card.css"

function TeamCard({ name = "", location = "", country = "", image = "", primaryColor = "", accentColor = "" }) {
    const [alpha2, setAlpha2] = useState("xx");
    const [alpha3, setAlpha3] = useState("");

    // useEffect(() => {
    //     getDriverNationality();
    // }, [name, country])

    useEffect(() => {
        setAlpha2(convertCountryCode(country));
    }, [name, country]);

    return (
        <div className="card-wrapper" style={{ backgroundColor: `${primaryColor}` }}>
            <div className="card driver-card" style={{ backgroundColor: `${primaryColor}` }}>
                <div className="driver-card-header">
                    <div className="driver-card-title">
                        <h1>{`${name}`}</h1>
                        <h2>{location}</h2>
                    </div>
                    {/* <label className="driver-number" style={{ backgroundColor: `${accentColor}` }}>{number}</label> */}
                </div>
                <div className="card-img-container" style={{ "--racing-stripe-clr": accentColor }}>
                    <img className="card-img" data-type="team" src={image}></img>
                </div>
                <div className="driver-card-footer">
                    {/* <h1 className="driver-acronym">{acronym}</h1> */}
                    <div className="flag-container">
                        <span className={`fi fi-${alpha2} driver-flag`}></span>
                    </div>
                </div>
            </div >
        </div>

    );
}

export default TeamCard;