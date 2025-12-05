import TireSVG from "../../assets/tire.svg"
import Tire from "../BackgroundElements/Tire";
import "./Track.css"
function TireItem({ title = "", active = false, fill = "var(--clr-neutral-100)" }) {
    return (
        <div className="tire-item">
            <label>{title}</label>
            <Tire fill={fill} style={{ opacity: `${active ? 1 : 0.2}` }}></Tire>
        </div>
    )
}

export default TireItem;