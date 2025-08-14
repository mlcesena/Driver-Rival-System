import "./Track.css"
import "../../css/main.css"

function CompoundBar() {
    return (
        <div className="compound-container">
            <div style={{ display: "flex" }}>
                <label>Hardest (Less Grip)</label>
                <label className="justify-right">Softest (More Grip)</label>
            </div>
            <div className="compound-bar"></div>
        </div>
    )
}

export default CompoundBar;