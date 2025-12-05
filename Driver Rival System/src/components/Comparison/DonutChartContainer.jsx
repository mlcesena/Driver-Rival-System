import { useDriverContext } from "../../contexts/DriverContext";
import DonutChart from "./DonutChart"
import "./Comparison.css"
import "./../Cards/Card.css"
import DriverLegend from "../DriverLegend";

function DonutChartContainer({ title = "Null" }) {
    const { drivers, firstDriverNumber, secondDriverNumber } = useDriverContext();

    return (
        <>
            <div className="donut-chart-container">
                <DonutChart
                    label="Race Completions"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).complete_race_count : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).total_race_count : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).complete_race_count : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).total_race_count : 0}
                ></DonutChart>
                <DonutChart
                    label="Top 10 Finishes"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).race_top_10 : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).total_race_count : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).race_top_10 : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).total_race_count : 0}
                ></DonutChart>
                <DonutChart
                    label="Top 3 Finishes"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).race_podiums : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).total_race_count : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).race_podiums : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).total_race_count : 0}
                ></DonutChart>
                <DonutChart
                    label="Disqualifications"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).race_dsq : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).total_race_count : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).race_dsq : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).total_race_count : 0}
                ></DonutChart>
                <DonutChart
                    label="Did Not Finish"
                    driverValue1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).incomplete_race_count : 0}
                    driverTotal1={firstDriverNumber > 0 ? drivers.get(firstDriverNumber).total_race_count : 0}
                    driverValue2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).incomplete_race_count : 0}
                    driverTotal2={secondDriverNumber > 0 ? drivers.get(secondDriverNumber).total_race_count : 0}
                ></DonutChart>
            </div>
        </>

    )
}

export default DonutChartContainer;