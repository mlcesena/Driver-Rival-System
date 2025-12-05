import "./Track.css"
import "../../css/main.css"

function CompoundBar() {
    return (
        <div className="compound-container">
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <label>Softest (More Grip)</label>
                <label className="justify-right">Hardest (Less Grip)</label>
            </div>
            <div className="compound-row">
                <div className="compound-bar" style={{ "--tire-clr": "var(--clr-soft-high)" }}></div>
                <div className="compound-bar" style={{ "--tire-clr": "var(--clr-soft-low)" }}></div>
                <div className="compound-bar" style={{ "--tire-clr": "var(--clr-medium-high)" }}></div>
                <div className="compound-bar" style={{ "--tire-clr": "var(--clr-medium-low)" }}></div>
                <div className="compound-bar" style={{ "--tire-clr": "var(--clr-hard-high)" }}></div>
                <div className="compound-bar" style={{ "--tire-clr": "var(--clr-hard-low)" }}></div>
            </div>
        </div>
    )
}

export default CompoundBar;