import { useDriverContext } from "../../contexts/DriverContext";
import DonutChart from "./DonutChart"
import "./Comparison.css"
import "./../Cards/Card.css"

function DonutChartContainer({ title = "Null" }) {
    const { drivers, firstDriverNumber, secondDriverNumber } = useDriverContext();

    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h1>{title}</h1>
            </div>
            <span className="divider"></span>
            <div className="donut-chart-container">
                <DonutChart
                    label="Race Completions"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).completedRaceCount : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).totalRaceCount : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).completedRaceCount : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).totalRaceCount : 0}
                ></DonutChart>
                <DonutChart
                    label="Disqualifications"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).dsq : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).totalRaceCount : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).dsq : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).totalRaceCount : 0}
                ></DonutChart>
                <DonutChart
                    label="Did Not Finish"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).incompleteRaceCount : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).totalRaceCount : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).incompleteRaceCount : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).totalRaceCount : 0}
                ></DonutChart>
            </div>
        </div>
    )
}

export default DonutChartContainer;