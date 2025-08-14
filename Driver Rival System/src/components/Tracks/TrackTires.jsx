import CompoundBar from "./CompoundBar";
import TireItem from "./TireItem";

function TrackTires() {
    return (
        <div className="tire-wrapper">
            <div className="tire-container">
                <TireItem title="C1"></TireItem>
                <TireItem title="C2"></TireItem>
                <TireItem title="C3"></TireItem>
                <TireItem title="C4"></TireItem>
                <TireItem title="C5"></TireItem>
                <TireItem title="C6"></TireItem>
            </div>
            <CompoundBar></CompoundBar>
        </div>

    );
}

export default TrackTires;