import { useId } from "react";
import "./ToggleButton.css"
import "../../../css/main.css"

function defaultUpdater() {

}

function ToggleButton({ label1 = "", label2 = "", updaterFunction = defaultUpdater }) {
    const groupName = useId();

    return (
        <div className="toggle-btn-container">
            <ul className="toggle-group">
                <li className="toggle-btn">
                    <input type="radio" name={groupName} id={label1 + "-" + groupName} onChange={() => {
                        updaterFunction(1);
                    }} defaultChecked></input>
                    <label htmlFor={label1 + "-" + groupName}>{label1}</label>
                </li>
                <li className="toggle-btn">
                    <input type="radio" name={groupName} id={label2 + "-" + groupName} onChange={() => {
                        updaterFunction(2);
                    }}></input>
                    <label htmlFor={label2 + "-" + groupName}>{label2}</label>
                </li>
            </ul>
        </div>
    );
}

export default ToggleButton;