import { useEffect, useState } from "react";
import "../../css/Info.css"

function ModuleContainer({ title = "Null", children, className = "info-wrapper", style, expandedProp = true }) {
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        setExpanded(expandedProp);
    }, [expandedProp]);

    return (
        <div className={`content-container-large module-container ${className}`}>
            <div className="info-text-container">
                <div>
                    <span style={{ display: "flex" }}>
                        <h1 className="fs-sub-heading accent">{title}</h1>
                        <button className="collapsible-btn justify-right" title="Collapse" aria-expanded={expanded} onClick={() => setExpanded((e) => !e)}>
                            <span className="material-symbols-outlined">
                                {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                            </span>
                        </button>
                    </span>
                    {expanded && <div className="divider" style={{ "--divider-margin": "1rem" }}></div>}
                </div>
                {expanded && children}
            </div>
        </div >
    );
}

export default ModuleContainer;