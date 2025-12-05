import { useState, useRef, useEffect, cloneElement, Children, isValidElement } from "react";
import Tire from "../BackgroundElements/Tire"
import "../../css/Info.css"

function ModuleSection({ title, id, ref, active = false, children, collapsible = true }) {
    const tireRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [expanded, setExpanded] = useState(true);
    let fill = isInView ? "var(--clr-accent-400)" : "var(--clr-neutral-700)";

    const childrenWithExpanded = Children.map(children, child => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, { expandedProp: expanded });
    });

    useEffect(() => {
        if (active && !isInView) {
            setIsInView(true);
        }
        else if (!active && isInView) {
            setIsInView(false);
        }
    }, [active])

    useEffect(() => {
        if (isInView) {
            if (tireRef.current) {
                tireRef.current.animate(
                    [
                        { transform: "rotate(0deg)" },
                        { transform: "rotate(360deg)" }
                    ],
                    { duration: 1000, easing: "ease-in-out" }
                )
            }
        }
    }, [isInView]);

    return (
        <section className="info-section" id={id} ref={ref}>
            <div className="module-guide-wrapper" style={{ "--line-clr": `${isInView ? "var(--clr-accent-400)" : "var(--clr-neutral-800)"}` }} >
                <div className="module-guide-icon-wrapper">
                    <Tire fill={fill} ref={tireRef}></Tire>
                </div>
            </div>
            <div className="section-content">
                <span style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="fs-secondary-heading">{title}</h1>
                    {collapsible && <button className="collapsible-btn justify-right" title="Collapse Section" aria-expanded={expanded} onClick={() => setExpanded((e) => !e)}>
                        <span className="material-symbols-outlined">
                            {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                        </span>
                    </button>}
                </span>
                {childrenWithExpanded}
            </div>
        </section >
    )
}

export default ModuleSection;