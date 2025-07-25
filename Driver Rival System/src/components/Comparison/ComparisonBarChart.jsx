import { useDriverContext } from '../../contexts/DriverContext'
import ComparisonItem from './ComparisonItem'
import DriverLegend from "../DriverLegend"
import "./Comparison.css"
import "./../Cards/Card.css"
import { useEffect } from "react";

function ComparisonChart({ data = new Map(), inverse = false }) {
    const { drivers, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary } = useDriverContext();

    // useEffect(() => {

    // }, [data]);

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <DriverLegend></DriverLegend>
            <ul className="driver-stats">
                {data.size > 0 && Array.from(data.keys()).map((item, idx) => (
                    <ComparisonItem title={item} key={idx} team1={team1Primary} team2={team2Primary}
                        stat1={data.get(item)[0]}
                        stat2={data.get(item)[1]}
                        inverse={inverse}
                    ></ComparisonItem>
                ))}
            </ul>
        </div>
    )
}

export default ComparisonChart;