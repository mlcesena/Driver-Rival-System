import ComboBox from "../ComboBox/ComboBox"
import ToggleButton from "../Controls/Toggle/ToggleButton";
import DriverLegend from "../DriverLegend";
import TeamLegend from "../TeamLegend";
import "./Comparison.css"

function ComparisonContainer({ title = "null", controlType = "", controlProps = {}, description = "", childComponent = null, containerType = null, forceSplit = false }) {
    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h1>{title}</h1>
                {controlType === "combobox" && <ComboBox title="Calendar Year" options={[{ id: 0, value: "2025" }]}></ComboBox>}
                {controlType === "toggle" && <ToggleButton {...controlProps}></ToggleButton>}
            </div>
            <span className="divider"></span>
            {containerType === "driver" ? <DriverLegend /> : containerType === "team" ? <TeamLegend forceSplit={forceSplit} /> : null}
            {childComponent ? childComponent : <></>}
            <div className="comparison-desc">
                <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
            </div>
        </div>
    );
}

export default ComparisonContainer;