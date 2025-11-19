import "./ComboBox.css"
import { useState, useRef, useEffect } from "react";

function defaultUpdater() {

};

function ComboxBox({ title = "", options = [], updaterFunction = defaultUpdater, searchable = false, activeIdx = 0 }) {
    const [selectedIdx, setSelectedIdx] = useState(searchable ? -1 : 0);
    const [expanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef();
    const optionsRef = useRef();
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        if (expanded) {
            setShowOptions(true)
        } else if (!expanded && optionsRef.current) {
            optionsRef.current.animate(
                [
                    { maxHeight: "300px", },
                    { maxHeight: "0px", }
                ],
                { duration: 250, easing: "ease-in-out" }
            );

            setTimeout(() => {
                optionsRef.current.style.maxHeight = "0px";
                setShowOptions(false);
            }, 250);

        }
    }, [expanded]);

    useEffect(() => {
        if (showOptions && optionsRef.current) {
            optionsRef.current.style.maxHeight = "0px";
            optionsRef.current.animate(
                [
                    { maxHeight: "0px", },
                    { maxHeight: "300px", }
                ],
                { duration: 250, easing: "ease-in-out" }
            );

            optionsRef.current.style.maxHeight = "300px";
        }
    }, [showOptions])

    useEffect(() => {
        if (options.length && activeIdx > 0 && activeIdx < options.length) {
            setSelectedIdx(activeIdx)
        }
    }, [activeIdx])

    function handleClick() {
        if (!expanded) {
            inputRef.current.focus()
            setExpanded(true)
            setSearchQuery("")
        }
        else {
            inputRef.current.blur()
            setExpanded(false)

            if (selectedIdx >= 0)
                setSearchQuery(options[selectedIdx].value)
        }
    }

    const filterOptions = searchQuery === "" ? options : options.filter((option) => option.value.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="combobox">
            <p className="combo-title">{title}</p>
            <div className={`combo-container ${expanded ? "combo-expanded" : ""}`} onClick={handleClick}>
                <div className="combo-controls">
                    <input
                        className="combo-input"
                        ref={inputRef}
                        value={searchable ? searchQuery : options[selectedIdx]?.value}
                        onChange={(event) => (setSearchQuery(event.target.value))}
                        disabled={!searchable}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false">
                    </input>
                    <button className={`combo-btn${expanded ? " open" : ""}`} onClick={handleClick}>
                        <svg width="50" height="10" viewBox="0 0 50 50">
                            <path d="M0 10 L25 40 L50 10" stroke="white" strokeWidth="10" fill="none" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
            {showOptions && (
                <ul
                    className={`combo-options`}
                    ref={optionsRef}>
                    {filterOptions.map((option, idx) => (
                        <li
                            className={selectedIdx === idx ? "active-option" : ""}
                            key={idx}
                            onClick={() => {
                                setSelectedIdx(option.id);
                                setExpanded(false);
                                updaterFunction(option.item);
                                setSearchQuery(option.value)
                            }}>{option.value}</li>
                    ))}
                </ul>
            )}
        </div >
    )
}

export default ComboxBox;