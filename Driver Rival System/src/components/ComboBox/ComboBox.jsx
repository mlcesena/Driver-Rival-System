import "./ComboBox.css"
import { useState, useRef, useEffect } from "react";

function ComboxBox({ title = "", options = [], updaterFunction }) {
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef();
    const optionsRef = useRef();
    // const [showOptions, setShowOptions] = useState(false);

    // useEffect(() => {
    //     if (expanded) {
    //         setShowOptions(true); // Show immediately when expanding
    //     } else if (showOptions) {
    //         // Wait for animation before hiding
    //         const timeout = setTimeout(() => setShowOptions(false), 250); // match your CSS transition
    //         return () => clearTimeout(timeout);
    //     }
    // }, [expanded]);

    function handleClick() {
        if (!expanded) {
            inputRef.current.focus()
            setExpanded(true)
            setSearchQuery("")
        }
        else {
            inputRef.current.blur()
            setExpanded(false)

            setSearchQuery(options[selectedIdx].name)
        }
    }

    const filterOptions = searchQuery === "" ? options : options.filter((option) => option.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="combobox">
            <p className="combo-title">{title}</p>
            <div className="combo-container" onClick={handleClick}>
                <div className="combo-controls">
                    <input
                        className="combo-input"
                        ref={inputRef}
                        value={searchQuery}
                        onChange={(event) => (setSearchQuery(event.target.value))}>
                    </input>
                    {/* <button className="combo-btn" onClick={handleClick}>&#x2304;</button> */}
                    <button className={`combo-btn${expanded ? " open" : ""}`} onClick={handleClick}>
                        <svg width="50" height="10" viewBox="0 0 50 50">
                            <path d="M0 10 L25 40 L50 10" stroke="white" stroke-width="10" fill="none" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
            {true && (<ul className={`combo-options${expanded ? "" : " collapsed"}`} ref={optionsRef}>
                {filterOptions.map((option, idx) => (
                    <li
                        className={selectedIdx === idx ? "active" : ""}
                        key={idx}
                        onClick={() => {
                            setSelectedIdx(option.id);
                            setExpanded(false);
                            updaterFunction(option.id);
                            setSearchQuery(option.name)
                        }}>{option.name}</li>
                ))}
            </ul>)
            }
        </div >
    )
}

export default ComboxBox;