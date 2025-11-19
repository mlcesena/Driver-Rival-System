import { useState, useRef, useEffect } from "react";
import Curve from "../BackgroundElements/Curve";
import "./Carousel.css"

function Carousel({ children = [] }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const carouselRef = useRef(null);
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

    function handleSlideChange(value) {
        const itemCount = children.length - 1;

        if (activeIdx + value > itemCount) {
            setActiveIdx(0);
        }
        else if (activeIdx + value < 0) {
            setActiveIdx(itemCount);
        }
        else {
            setActiveIdx((a) => a + value);
        }
    }

    // useEffect(() => {

    // }, []);

    return (<>
        <div className="carousel-container">
            <div className="carousel-slides" ref={carouselRef}>
                {children.map((child, idx) => (
                    <span
                        className="carousel-card"
                        key={idx}
                        style={{ display: windowWidth > breakpoint ? "block" : idx === activeIdx ? "block" : "none" }}>
                        {child}
                    </span>
                ))}
            </div >
            {<div className="carousel-row">
                <span className="carousel-btn-wrapper">
                    <button className="button" data-type="carousel" onClick={() => handleSlideChange(-1)}>
                        <span className="material-symbols-outlined">
                            keyboard_arrow_left
                        </span>
                    </button>
                </span>
                <ul className="carousel-indicators">
                    {children.map((_, idx) => (
                        <li className={`carousel-indicator ${activeIdx === idx ? "active" : ""}`}
                            key={idx}
                            onClick={() => setActiveIdx(idx)}>
                        </li>
                    ))}
                </ul>
                <span className="carousel-btn-wrapper">
                    <button className="button" data-type="carousel" onClick={() => handleSlideChange(1)}>
                        <span className="material-symbols-outlined">
                            keyboard_arrow_right
                        </span>
                    </button>
                </span>
            </div>}
        </div>
    </>)
}

export default Carousel;