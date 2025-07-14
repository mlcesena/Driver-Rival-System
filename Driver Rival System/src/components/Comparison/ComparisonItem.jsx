import { useEffect, useState } from "react";

function DriverCompItem({ title = "Null", team1 = "", team2 = "", stat1 = 0, stat2 = 0 }) {
    const [statWidth1, setStatWidth1] = useState(0);
    const [statWidth2, setStatWidth2] = useState(0);

    useEffect(() => {
        const total = stat1 + stat2;

        if (!stat1 && !stat2) {
            setStatWidth1(50);
            setStatWidth2(50);
        }
        else {
            setStatWidth1((stat1 / total).toFixed(2) * 100);
            setStatWidth2((stat2 / total).toFixed(2) * 100);
        }
    }, [stat1, stat2]);

    return (
        <li className="driver-stat-item">
            <h2>{title}</h2>
            <div className="comparison-stat">
                <span className={`comparison-bar ${stat1 > stat2 ? " winner" : ""}`} style={{ backgroundColor: `${team1}`, width: `${statWidth1}%`, display: `${!statWidth1 && statWidth2 ? "none" : ""}` }}>{stat1}</span>
                <span className={`comparison-bar ${stat2 > stat1 ? " winner" : ""}`} style={{ backgroundColor: `${team2}`, width: `${statWidth2}%`, display: `${statWidth1 && !statWidth2 ? "none" : ""}` }}> {stat2}</span>
            </div>
        </li >
    )
}

export default DriverCompItem;