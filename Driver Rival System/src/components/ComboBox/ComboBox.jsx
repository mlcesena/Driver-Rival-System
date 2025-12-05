import "./ComboBox.css"
import { useState, useRef, useEffect } from "react";

function defaultUpdater() {

};

function ComboxBox({
    title = "",
    options = [],
    updaterFunction = defaultUpdater,
    searchable = false,
    activeIdx = 0,
    usePlaceHolder = false,
    invalidOptions = new Set(),
    ref
}) {
    const [selectedIdx, setSelectedIdx] = useState(searchable && !usePlaceHolder ? -1 : 0);
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
                if (optionsRef.current)
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
        if (!options.length) return;

        if (activeIdx === -1) {
            setSelectedIdx(-1);
            setSearchQuery("");
            if (inputRef.current) inputRef.current.value = "";
            return;
        }

        if (activeIdx >= 0 && activeIdx < options.length) {
            setSelectedIdx(activeIdx)
        }
    }, [activeIdx, options.length])

    useEffect(() => {
        if (inputRef.current && selectedIdx !== -1) {
            inputRef.current.value = options[selectedIdx]?.text;
        }
    }, [selectedIdx])

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
                setSearchQuery(options[selectedIdx].text)
        }
    }

    const filterOptions = () => {
        const filteredOptions = options.filter((option) => !invalidOptions.has(option.text));
        if (searchQuery === "")
            return filteredOptions;
        else
            return filteredOptions.filter((option) => option.text.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const removeFocus = () => {
        if (expanded) {
            inputRef.current?.blur();
            setExpanded(false);
        }
    }

    return (
        <div className="combobox" ref={ref} onBlur={removeFocus}>
            <p className="combo-title">{title}</p>
            <div className={`combo-container ${expanded ? "combo-expanded" : ""}`} onClick={handleClick}>
                <div className="combo-controls">
                    <input
                        className="combo-input"
                        ref={inputRef}
                        value={searchable ? searchQuery : options[selectedIdx]?.text}
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
                    {filterOptions().map((option, idx) => (
                        <li
                            className={selectedIdx === option.id ? "active-option" : ""}
                            key={idx}
                            onClick={() => {
                                setSelectedIdx(option.id);
                                setExpanded(false);
                                updaterFunction(option.id, option.value, option.text);
                                setSearchQuery(option.text);
                            }}>{option.text}</li>
                    ))}
                </ul>
            )}
        </div >
    )
}

export default ComboxBox;