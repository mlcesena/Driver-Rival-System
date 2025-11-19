import { useState, useRef, useEffect } from "react";
import Tire from "../components/BackgroundElements/Tire"
import "../css/Info.css"

function ModuleSection({ title, id, ref, active = false, children }) {
    const tireRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    let fill = isInView ? "var(--clr-accent-400)" : "var(--clr-neutral-700)";

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
                <h1 className="fs-secondary-heading">{title}</h1>
                {children}
            </div>
        </section >
    )
}

export default ModuleSection;