import { useDriverContext } from "../../contexts/DriverContext";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./Comparison.css"

function ScatterChartContainer({ title = "Null" }) {
    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h1>{title}</h1>
            </div>
            <span className="divider"></span>
            <ScatterChart></ScatterChart>
        </div>
    );
}

export default ScatterChartContainer;