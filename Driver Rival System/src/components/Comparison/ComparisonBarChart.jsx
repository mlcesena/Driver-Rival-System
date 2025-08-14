import ComparisonItem from './ComparisonItem'
import "./Comparison.css"
import "./../Cards/Card.css"
import { useEffect } from "react";

function ComparisonBarChart({ data = new Map(), team1Primary, team2Primary, team1Accent, team2Accent, inverse = false }) {
    // const { team1Primary, team2Primary, team1Accent, team2Accent } = useDriverContext();

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <ul className="driver-stats">
                {data.size > 0 && Array.from(data.keys()).map((item, idx) => (
                    <ComparisonItem title={item} key={idx} team1Color={team1Primary} team2Color={team2Primary} team2Accent={team2Accent}
                        stat1={data.get(item)[0]}
                        stat2={data.get(item)[1]}
                        inverse={inverse}
                    ></ComparisonItem>
                ))}
            </ul>
        </div>
    )
}

export default ComparisonBarChart;