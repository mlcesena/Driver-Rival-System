import { useDriverContext } from "../../contexts/DriverContext";
import ComboBox from "../ComboBox/ComboBox"
import ComparisonItem from './ComparisonItem'
import "./Comparison.css"

function ComparisonChart() {
    const { drivers, firstDriverIdx, secondDriverIdx, team1Primary, team2Primary } = useDriverContext();

    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h1>Head to Head</h1>
                <ComboBox title="Calendar Year"></ComboBox>
            </div>
            <span className="divider"></span>
            <div className='comparison-names'>
                <h2 className='driver-acronym'>{drivers.length > 0 && firstDriverIdx > -1 ? drivers[firstDriverIdx].name_acronym : "---"}</h2>
                <h2 className='driver-acronym' style={{ marginLeft: "auto" }}>{drivers.length > 0 && secondDriverIdx > -1 ? drivers[secondDriverIdx].name_acronym : "---"}</h2>
            </div>
            <ul className="driver-stats">
                <ComparisonItem title='Wins' team1={team1Primary} team2={team2Primary}></ComparisonItem>
                <ComparisonItem title='Podiums' team1={team1Primary} team2={team2Primary}></ComparisonItem>
                <ComparisonItem title='Points' team1={team1Primary} team2={team2Primary}></ComparisonItem>
                <ComparisonItem title='Grand Prix' team1={team1Primary} team2={team2Primary}></ComparisonItem>
                <ComparisonItem title='Laps' team1={team1Primary} team2={team2Primary}></ComparisonItem>
            </ul>
        </div>
    )
}

export default ComparisonChart;