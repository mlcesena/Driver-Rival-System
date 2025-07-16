import { useDriverContext } from "../../contexts/DriverContext";
import "./Comparison.css"
import "./../Cards/Card.css"
import Donut from "./Donut";

function DonutChart({ label = "Null", driverValue1 = 0, driverTotal1 = 0, driverValue2 = 0, driverTotal2 = 0 }) {
    const { team1Primary, team2Primary } = useDriverContext();

    return (
        <div className="dual-donut-wrapper">
            <div className="donut-wrapper">
                <Donut
                    color={team1Primary}
                    value={driverValue1}
                    total={driverTotal1}>
                </Donut>
                <Donut
                    color={team2Primary}
                    value={driverValue2}
                    total={driverTotal2}>
                </Donut>
            </div>
            <h2>{label}</h2>
        </div>
    )
}

export default DonutChart;