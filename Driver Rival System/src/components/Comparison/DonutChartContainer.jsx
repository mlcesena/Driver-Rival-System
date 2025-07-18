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
                    label="Top 10 Finishes"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).top10 : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).totalRaceCount : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).top10 : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).totalRaceCount : 0}
                ></DonutChart>
                <DonutChart
                    label="Top 3 Finishes"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).podiums : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).totalRaceCount : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).podiums : 0}
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

{/* <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "0.25rem" }}>
                    <rect width="16" height="16" x="0" y="0" fill="black" />
                    <rect width="16" height="16" x="16" y="0" fill="white" />
                    <rect width="16" height="16" x="32" y="0" fill="black" />
                    <rect width="16" height="16" x="0" y="16" fill="white" />
                    <rect width="16" height="16" x="16" y="16" fill="black" />
                    <rect width="16" height="16" x="32" y="16" fill="white" />
                    <rect width="16" height="16" x="0" y="32" fill="black" />
                    <rect width="16" height="16" x="16" y="32" fill="white" />
                    <rect width="16" height="16" x="32" y="32" fill="black" />
                </svg> */}