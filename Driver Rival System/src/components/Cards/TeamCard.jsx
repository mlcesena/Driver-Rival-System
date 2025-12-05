import { useEffect, useRef, useState } from "react";
import { convertCountryCode } from "../../services/GlobalServices";
import "./Card.css"

function TeamCard({
    name = "",
    location = "",
    country = "",
    image = "",
    primaryColor = "",
    accentColor = "",
    teamData = [],
    reverse = false
}) {
    const [alpha2, setAlpha2] = useState("xx");
    const [alpha3, setAlpha3] = useState("");
    const aboutTitles = [
        "Founding Year",
        "Active Season Count",
        "Constructors Titles",
        // "Race + Sprint Wins",
        // "Points",
        "Team Principal",
        "CEO"
    ];

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
                {!reverse ?
                    <div className="card-body" style={{ "--racing-stripe-clr": accentColor }}>
                        <div className="card-img-container" >
                            <img
                                className="card-img"
                                data-type="team"
                                src={image}
                                alt={`${name} team logo`}></img>
                        </div>
                    </div> :
                    <>
                        <div className="divider" style={{ "--divider-color": accentColor, "--divider-margin": "0.75rem" }}></div>
                        <div className="card-info-body">
                            {aboutTitles.map((title, idx) => (
                                <span key={idx}>
                                    <h2 className="ff-body fw-bold">{title}</h2>
                                    <p className="ff-body">{teamData[idx] ?? "Null"}</p>
                                </span>
                            ))}
                        </div>
                    </>
                }

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