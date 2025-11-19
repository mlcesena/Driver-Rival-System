import { useState, useEffect } from "react";
import "../../css/main.css"
import ComboxBox from "../ComboBox/ComboBox";

function TrackNav({ options = [], updaterFunction }) {
    const [activeIdx, setActiveIdx] = useState(-1);
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
        setActiveIdx(0);
    }, []);

    function updateIdx(idx) {
        setActiveIdx(idx);
    }

    useEffect(() => {
        updaterFunction(options[activeIdx], activeIdx);
    }, [activeIdx])

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

    return (
        <>
            <div className="track-nav-container">
                {windowWidth <= breakpoint ?
                    <ComboxBox
                        title="Track Name"
                        options={options.map((option, idx) => ({ id: idx, item: idx, value: option }))}
                        updaterFunction={updateIdx}
                        activeIdx={activeIdx}>
                    </ComboxBox> :
                    <>
                        <div>
                            {/* <div className="search-box">
                                <input
                                    placeholder="Search"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false">
                                </input>
                            </div> */}
                            {/* <ComboxBox
                                options={options.map((option, idx) => ({ id: idx, item: idx, value: option }))}
                                updaterFunction={updateIdx}
                                activeIdx={activeIdx}>
                            </ComboxBox> */}

                            <ul className="track-nav-options">
                                {options.map((option, idx) => (
                                    <li key={idx} style={{ display: (idx >= rangeMin && idx <= rangeMax) ? "" : "none" }}>
                                        <input type="radio" name="track-nav" id={`${option}-option`} onChange={() => updateIdx(idx)} checked={idx === activeIdx ? true : false}></input>
                                        <label htmlFor={`${option}-option`}>{option}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className="track-nav-controls">
                            <button className="button" data-type="list" onClick={increaseIndex}>
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_up
                                </span>
                            </button>
                            <button className="button" data-type="list" onClick={decreaseIndex}>
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </button>
                        </div>
                    </>

                }
            </div>
        </>
    );
}

export default TrackNav;