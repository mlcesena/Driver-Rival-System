import ComboBox from "../ComboBox/ComboBox"
import ToggleButton from "../Controls/Toggle/ToggleButton";
import "./Comparison.css"

function ComparisonContainer({ title = "null", controlType = "", controlProps = {}, description = "", childComponent = null }) {
    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h1>{title}</h1>
                {controlType === "combobox" && <ComboBox title="Calendar Year" options={[{ id: 0, value: "2025" }]}></ComboBox>}
                {controlType === "toggle" && <ToggleButton {...controlProps}></ToggleButton>}
            </div>
            <span className="divider"></span>
            {childComponent ? childComponent : <></>}
            <div className="comparison-desc">
                <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
            </div>
        </div>
    );
}

export default ComparisonContainer;