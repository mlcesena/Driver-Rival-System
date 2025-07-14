import { useDriverContext } from "../../contexts/DriverContext";
import ComboBox from "../ComboBox/ComboBox"
import ComparisonItem from './ComparisonItem'
import "./Comparison.css"
import "./../Cards/Card.css"

function ComparisonChart() {
    const { drivers, firstDriverNumber, secondDriverNumber, team1Primary, team2Primary, driverStats } = useDriverContext();

    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h1>Head to Head</h1>
                <ComboBox title="Calendar Year" options={[{ id: 0, value: "2025" }]}></ComboBox>
            </div>
            <span className="divider"></span>
            <div className='comparison-names'>
                <h2 className='driver-acronym' style={{ marginLeft: 0 }}>{drivers.size > 0 && firstDriverNumber > -1 ? drivers.get(firstDriverNumber).acronym : "---"}</h2>
                <h2 className='driver-acronym' style={{ marginLeft: "auto" }}>{drivers.size > 0 && secondDriverNumber > -1 ? drivers.get(secondDriverNumber).acronym : "---"}</h2>
            </div>
            <ul className="driver-stats">
                <ComparisonItem title='Wins' team1={team1Primary} team2={team2Primary}
                    stat1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).wins : 0}
                    stat2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).wins : 0}></ComparisonItem>
                <ComparisonItem title='Podiums' team1={team1Primary} team2={team2Primary}
                    stat1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).podiums : 0}
                    stat2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).podiums : 0}></ComparisonItem>
                <ComparisonItem title='Points' team1={team1Primary} team2={team2Primary}
                    stat1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).points : 0}
                    stat2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).points : 0}></ComparisonItem>
                <ComparisonItem title='Grand Prix' team1={team1Primary} team2={team2Primary}
                    stat1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).races : 0}
                    stat2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).races : 0}></ComparisonItem>
                <ComparisonItem title='Laps' team1={team1Primary} team2={team2Primary}
                    stat1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).laps : 0}
                    stat2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).laps : 0}></ComparisonItem>
            </ul>
        </div>
    )
}

export default ComparisonChart;