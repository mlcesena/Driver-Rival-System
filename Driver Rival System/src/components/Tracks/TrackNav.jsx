import { useState, useEffect } from "react";
import "../../css/main.css"
import ComboxBox from "../ComboBox/ComboBox";

function TrackNav({ options = [], updaterFunction }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(10);
    const breakpoint = 50 * 16;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        updaterFunction(options[activeIdx], activeIdx);
    }, [activeIdx])

    useEffect(() => {
        setActiveIdx(0);
    }, []);

    function increaseIndex() {
        if (activeIdx - 1 >= 0 && activeIdx - 1 < rangeMin) {
            setRangeMin((m) => m - 1);
            setRangeMax((m) => m - 1);
        }
        else if (activeIdx - 1 < 0) {
            setRangeMin(options.length - 1 - 10);
            setRangeMax(options.length - 1);
        }
        setActiveIdx((a) => a > 0 ? a - 1 : (options.length - 1))
    }

    function decreaseIndex() {
        if (activeIdx + 1 < options.length && activeIdx + 1 > rangeMax) {
            setRangeMin((m) => m + 1);
            setRangeMax((m) => m + 1);
        }
        else if (activeIdx + 1 >= options.length) {
            setRangeMin(0);
            setRangeMax(10);
        }
        setActiveIdx((a) => a < (options.length - 1) ? a + 1 : 0)
    }

    function updateIndex(idx) {
        if (idx === rangeMin) {
            let temp = 3;
            if (rangeMin - 3 < 0) {
                temp = Math.abs(0 - rangeMin)
            }
            setRangeMin(rangeMin - (temp))
            setRangeMax(rangeMin - (temp) + 10)

        }
        else if (idx === rangeMax) {
            let temp = 3;
            if (rangeMax + 3 > options.length) {
                temp = options.length - rangeMax - 1
            }
            setRangeMin(rangeMax + (temp) - 10)
            setRangeMax(rangeMax + (temp))
        }
        else if (idx >= rangeMin && idx <= rangeMax) {

        }
        else if (idx + 10 < options.length) {
            setRangeMin(idx);
            setRangeMax(idx + 10);
        }
        else if (idx - 10 >= 0) {
            setRangeMin(idx - 10);
            setRangeMax(idx);
        }
        setActiveIdx(idx);
    }

    return (
        <>
            <div className="track-nav-container">
                <ComboxBox
                    title="Track Name"
                    options={options.map((option, idx) => ({ id: idx, value: idx, text: option }))}
                    updaterFunction={updateIndex}
                    activeIdx={activeIdx}
                    searchable={true}
                    usePlaceHolder={true}>
                </ComboxBox>
                {windowWidth > breakpoint ?
                    <div style={{ display: "flex" }}>
                        <ul className="track-nav-options">
                            {options.map((option, idx) => (
                                <li key={idx} style={{ display: (idx >= rangeMin && idx <= rangeMax) ? "" : "none" }}>
                                    <input type="radio" name="track-nav" id={`${option}-option`} onChange={() => updateIndex(idx)} checked={idx === activeIdx ? true : false}></input>
                                    <label htmlFor={`${option}-option`}>{option}</label>
                                </li>
                            ))}
                        </ul>
                        <div className="track-nav-controls">
                            <div style={{ marginBottom: "3.5rem" }}>
                                <div className="button-wrapper" data-type="list">
                                    <button className="button" data-type="list" title="Move to Top" onClick={() => updateIndex(0)}>
                                        <span className="material-symbols-outlined">
                                            keyboard_double_arrow_up
                                        </span>
                                    </button>
                                </div>
                                <div className="button-wrapper" data-type="list">
                                    <button className="button" data-type="list" title="Move Up" onClick={increaseIndex}>
                                        <span className="material-symbols-outlined">
                                            keyboard_arrow_up
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="button-wrapper" data-type="list">
                                    <button className="button" data-type="list" title="Move Down" onClick={decreaseIndex}>
                                        <span className="material-symbols-outlined">
                                            keyboard_arrow_down
                                        </span>
                                    </button>
                                </div>
                                <div className="button-wrapper" data-type="list">
                                    <button className="button" data-type="list" title="Move to Bottom" onClick={() => updateIndex(options.length - 1)}>
                                        <span className="material-symbols-outlined">
                                            keyboard_double_arrow_down
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </>
    );
}

export default TrackNav;