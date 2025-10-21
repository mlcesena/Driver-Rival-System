import "./Track.css"
import "../../css/main.css"

function CompoundBar() {
    return (
        <div className="compound-container">
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <label>Hardest (Less Grip)</label>
                <label className="justify-right">Softest (More Grip)</label>
            </div>
            <div className="compound-row">
                <div className="compound-bar" style={{ backgroundColor: "var(--clr-hard-low)" }}></div>
                <div className="compound-bar" style={{ backgroundColor: "var(--clr-hard-high)" }}></div>
                <div className="compound-bar" style={{ backgroundColor: "var(--clr-medium-low)" }}></div>
                <div className="compound-bar" style={{ backgroundColor: "var(--clr-medium-high)" }}></div>
                <div className="compound-bar" style={{ backgroundColor: "var(--clr-soft-low)" }}></div>
                <div className="compound-bar" style={{ backgroundColor: "var(--clr-soft-high)" }}></div>
            </div>
        </div>
    )
}

export default CompoundBar;