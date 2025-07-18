import "./ToggleButton.css"
import "../../../css/main.css"

function ToggleButton({ label1 = "", label2 = "" }) {
    function handleToggle() {


    }

    return (
        <div className="toggle-btn-container">
            <ul className="toggle-buttons">
                <li className="toggle-btn">
                    <input type="radio" name="toggles" id={label1} onChange={handleToggle}></input>
                    <label htmlFor={label1}>{label1}</label>
                </li>
                <li className="toggle-btn">
                    <input type="radio" name="toggles" id={label2} onChange={handleToggle}></input>
                    <label htmlFor={label2}>{label2}</label>
                </li>
            </ul>
        </div>
    );
}

export default ToggleButton;