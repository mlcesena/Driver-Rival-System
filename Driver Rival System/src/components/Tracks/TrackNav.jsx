import { useState, useEffect } from "react";
import "../../css/main.css"
import ComboxBox from "../ComboBox/ComboBox";

function TrackNav({ options = [], updaterFunction }) {
    const [activeIdx, setActiveIdx] = useState(-1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
        updaterFunction(options[activeIdx]);
    }, [activeIdx])
    return (
        <>
            <div className="track-nav-container">
                {windowWidth <= breakpoint ?
                    <ComboxBox
                        title="Track Name"
                        options={options.map((option, idx) => ({ id: idx, value: option }))}
                        updaterFunction={updateIdx}
                        activeIdx={activeIdx}>
                    </ComboxBox> :
                    <>
                        <ul className="track-nav-options">
                            {options.map((option, idx) => (
                                <li key={idx}>
                                    <input type="radio" name="track-nav" id={`${option}-option`} onChange={() => updateIdx(idx)} checked={idx === activeIdx ? true : false}></input>
                                    <label htmlFor={`${option}-option`}>{option}</label>
                                </li>
                            ))}
                        </ul>

                        <div className="track-nav-controls">
                            <button className="button" data-type="carousel" onClick={() => { setActiveIdx((a) => a > 0 ? a - 1 : (options.length - 1)) }}>
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_up
                                </span>
                            </button>
                            <button className="button" data-type="carousel" onClick={() => { setActiveIdx((a) => a < (options.length - 1) ? a + 1 : 0) }}>
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