import { useRef, useState } from "react";
import ComboBox from "../ComboBox/ComboBox";
import "../../css/main.css"
import "./Card.css"



function CardControls({
    title = "",
    options,
    invalidOptions,
    onChanged,
    onReverseChanged,
    layout = "left" }) {
    const [comboIdx, setComboIdx] = useState(-1);
    const [reverse, setReverse] = useState(false);

    function onComboIndexChanged(id, value, text) {
        setComboIdx(id);
        onChanged(id, value, text);
    }

    function ContComboBox() {
        return (< ComboBox
            title={title}
            options={options}
            invalidOptions={invalidOptions}
            activeIdx={comboIdx}
            updaterFunction={onComboIndexChanged}
            searchable={true}
        />)
    }

    function ContCloseBtn({ style }) {
        return (
            <button className="button" data-type="list" style={style} title="Clear card" onClick={() => onComboIndexChanged(-1)}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        );
    }

    function ContFlipBtn({ style }) {
        const handleClick = () => {
            onReverseChanged(!reverse);
            setReverse(!reverse);
        }

        return (
            <button className="button" data-type="list" style={style} onClick={handleClick} title="Flip card">
                <span className="material-symbols-outlined">
                    laps
                </span>
            </button>
        );
    }

    function determineLayout() {
        if (layout === "right")
            return (<>
                <ContCloseBtn style={{ margin: "auto 0 0.125rem 0.5rem" }} />
                <ContFlipBtn style={{ margin: "auto auto 0.125rem 0.5rem" }} />
                <ContComboBox />
            </>)
        else {
            return (<>
                <ContComboBox />
                <ContFlipBtn style={{ margin: "auto 0.5rem 0.125rem auto" }} />
                <ContCloseBtn style={{ margin: "auto 0.5rem 0.125rem 0" }} />
            </>)
        }
    }

    return (
        <div className="card-control-row">
            {determineLayout()}
        </div>
    )
}

export default CardControls;