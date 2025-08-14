import TireSVG from "../../assets/tire.svg"
import "./Track.css"
function TireItem({ title = "" }) {
    return (
        <div className="tire-item">
            <label>{title}</label>
            <img src={TireSVG}></img>
        </div>
    )
}

export default TireItem;