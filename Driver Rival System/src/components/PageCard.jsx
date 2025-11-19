import { useEffect, useState, useRef } from "react";
import "../css/main.css"
import "../css/PageCard.css"
import { NavLink } from "react-router-dom";
function PageCard({ title = "Null", description = "", imageList = [""], elementList = [""], loop = false, page = "" }) {
    const [activeImage, setActiveImage] = useState("");
    const [activeElement, setActiveElement] = useState("");
    const [activeIdx, setActiveIdx] = useState(0);
    const [running, setRunning] = useState(false);
    const imageRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (loop && (imageList.length > 0)) {
            setRunning(false);
            setActiveIdx(0);
            setActiveImage(imageList[0]);
            setActiveElement(elementList[0]);
            setRunning(true);
        }

    }, [imageList]);

    useEffect(() => {
        if (loop) {
            if (running) {
                intervalRef.current = setInterval(() => {
                    if (imageRef.current) {
                        imageRef.current.animate(
                            [
                                { opacity: "0", },
                                { opacity: "1", }
                            ],
                            { duration: 750, easing: "ease-in-out" }
                        );
                        setTimeout(() => {
                            if (imageRef.current) {
                                imageRef.current.animate(
                                    [
                                        { opacity: "1", },
                                        { opacity: "0", }
                                    ],
                                    { duration: 750, easing: "ease-in-out" }
                                );
                            }
                        }, 3250)
                    }
                    incrementActive();
                }, 4000)
            }

            return () => {
                clearInterval(intervalRef.current);
            }
        }
    }, [running]);

    useEffect(() => {
        setActiveImage(imageList[activeIdx]);
        setActiveElement(elementList[activeIdx]);
    }, [activeIdx])

    const incrementActive = () => {
        if (imageList.length > 0) {
            setActiveIdx((a) => a === (imageList.length - 1) ? 0 : a + 1);
        }
    }

    return (<div className="page-card-wrapper"
    // onMouseEnter={() => (!running ? setRunning(true) : null)}
    // onMouseLeave={() => (running ? setRunning(false) : null)}
    >
        <div className="page-card">
            <h1>{title}</h1>
            {loop && activeImage !== "" ?
                <div className="page-card-image" ref={imageRef} style={{ "--active-content": `"${activeElement ?? ""}"` }}>
                    <img src={activeImage}></img>
                </div>
                :
                <div className="page-card-placeholder">
                    <h1>?</h1>
                </div>
            }
            <div className="page-card-columns">
                <p>{description}</p>
                <NavLink to={`/${page}`}>
                    <button className="button">
                        <span className="material-symbols-outlined" style={{ color: "white" }}>
                            arrow_right_alt
                        </span>
                    </button>
                </NavLink>

            </div>

        </div>
    </div>);
}

export default PageCard;