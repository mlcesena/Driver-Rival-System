import { useDriverContext } from "../contexts/DriverContext";
import "./Comparison/Comparison.css"
function DriverLegend() {
    const { drivers, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary, team2Accent } = useDriverContext();

    return (
        <div className='comparison-names'>
            <div>
                <span className="color-marker" style={{ backgroundColor: team1Primary }}></span>
                <h2 className='driver-acronym' style={{ margin: 0 }}>{drivers.size > 0 && firstDriverNumber > -1 ? drivers.get(firstDriverNumber).acronym : "---"}</h2>
            </div>
            <div style={{ marginLeft: "auto" }}>
                <h2 className='driver-acronym' style={{ marginBottom: 0 }}>{drivers.size > 0 && secondDriverNumber > -1 ? drivers.get(secondDriverNumber).acronym : "---"}</h2>
                <span className={`color-marker ${team1Primary === team2Primary ? "divided" : ""} `}
                    style={{ backgroundColor: team2Primary, "--mark-clr-1": team2Primary, "--mark-clr-2": team2Accent }}
                ></span>
            </div>
        </div>
    );
}

export default DriverLegend;