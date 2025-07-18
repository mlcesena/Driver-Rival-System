import { useDriverContext } from "../../contexts/DriverContext";
import ComboBox from "../ComboBox/ComboBox"
import ToggleButton from "../Controls/Toggle/ToggleButton";
import ComparisonItem from './ComparisonItem'
import "./Comparison.css"
import "./../Cards/Card.css"
import { useEffect } from "react";

function ComparisonChart({ title = "Null", type = "", data = new Map(), description = "" }) {
    const { drivers, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary } = useDriverContext();

    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h1>{title}</h1>
                {type === "combobox" && <ComboBox title="Calendar Year" options={[{ id: 0, value: "2025" }]}></ComboBox>}
            </div>
            <span className="divider"></span>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div className='comparison-names'>
                    <div>
                        <h2 className='driver-acronym' style={{ margin: 0 }}>{drivers.size > 0 && firstDriverNumber > -1 ? drivers.get(firstDriverNumber).acronym : "---"}</h2>
                        <span className="color-marker" style={{ backgroundColor: team1Primary }}></span>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <h2 className='driver-acronym' style={{ marginBottom: 0 }}>{drivers.size > 0 && secondDriverNumber > -1 ? drivers.get(secondDriverNumber).acronym : "---"}</h2>
                        <span className="color-marker" style={{ backgroundColor: team2Primary }}></span>
                    </div>
                </div>
                <ul className="driver-stats">
                    {data.size > 0 && Array.from(data.keys()).map((item, idx) => (
                        <ComparisonItem title={item} key={idx} team1={team1Primary} team2={team2Primary}
                            stat1={data.get(item)[0]}
                            stat2={data.get(item)[1]}
                        ></ComparisonItem>
                    ))}
                </ul>
            </div>
            <div className="comparison-desc">
                <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
            </div>
        </div>
    )
}

export default ComparisonChart;