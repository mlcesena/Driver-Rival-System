import { useEffect, useRef } from "react";
import "./../../css/main.css"
import { useGlobalStateContext } from "../../contexts/GlobalStateContext";
import tireSVG from "../../assets/tire.svg";

function LoadScreen() {
    const { loading, setLoading } = useGlobalStateContext();
    const intervalRef = useRef(null);
    const loadLabelRef = useRef();

    useEffect(() => {
        if (loading) {
            intervalRef.current = setInterval(() => {
                blinkType();
            }, 600)
        }

        return () => {
            clearInterval(intervalRef.current);
        }
    }, [loading]);

    const blinkType = () => {
        if (loadLabelRef.current) {
            if (!loadLabelRef.current.innerHTML.includes("_")) {
                loadLabelRef.current.innerHTML = `${loadLabelRef.current.innerHTML}_`;
            }
            else {
                loadLabelRef.current.innerHTML = loadLabelRef.current.innerHTML.slice(0, -1);
            }
        }
    }

    return (
        <div className="loading-container">
            <h1 className="fs-primary-heading">Driver Rival System</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "left", alignItems: "center" }}>
                <img src={tireSVG}></img>
                <h2 className="fs-sub-heading ff-body" ref={loadLabelRef} style={{ width: "150px" }}>Loading&thinsp;</h2>
            </div>
        </div>
    );
}

export default LoadScreen;