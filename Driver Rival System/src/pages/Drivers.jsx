import { useGlobalStateContext } from "../contexts/GlobalStateContext";
import { useDriverContext } from "../contexts/DriverContext";
import { useState, useEffect, useRef } from "react";
import DriverCard from '../components/Cards/DriverCard'
import DriverComparison from '../components/Comparison/DriverComparison'
import "../css/main.css"
import '../App.css'
import EmptyCard from "../components/Cards/EmptyCard";
import LoadScreen from "../components/LoadScreen/LoadScreen";
import LoadingError from "./LoadingError";
import CardControls from "../components/Cards/CardControls";

function Drivers() {
    // const { loading } = useGlobalStateContext();
    const [cardReverse1, setCardReverse1] = useState(false);
    const [cardReverse2, setCardReverse2] = useState(false);
    const {
        loading,
        error,
        drivers,
        firstDriverNumber,
        setFirstDriverNumber,
        secondDriverNumber,
        setSecondDriverNumber,
        team1Primary,
        team1Accent,
        team2Primary,
        team2Accent } = useDriverContext();

    const handleUpdatedDriver1 = (id, value, text) => {
        if (drivers.has(value))
            setFirstDriverNumber(value);
    };

    const handleUpdatedDriver2 = (id, value, text) => {
        if (drivers.has(value))
            setSecondDriverNumber(value);
    };
    // useEffect(() => {

    // }, [drivers])

    return (
        loading ? <LoadScreen /> :
            error ? <LoadingError message={error} />
                :
                <>
                    <div className="driver-container">
                        {drivers.size > 0 ? <>
                            <div className="driver-wrapper">
                                <CardControls
                                    title="Driver Selection"
                                    options={Array.from(drivers.keys()).map((number, idx) => (
                                        {
                                            id: idx,
                                            value: number,
                                            text: `${drivers.get(number).full_name}`,
                                        }))}
                                    invalidOptions={new Set([drivers.get(secondDriverNumber)?.full_name ?? null])}
                                    onChanged={handleUpdatedDriver1}
                                    onReverseChanged={(val) => setCardReverse1(val)}
                                />
                                {firstDriverNumber > -1 ? <DriverCard
                                    firstName={drivers.get(firstDriverNumber).first_name}
                                    lastName={drivers.get(firstDriverNumber).last_name}
                                    team={drivers.get(firstDriverNumber).team}
                                    number={drivers.get(firstDriverNumber).driver_number}
                                    acronym={drivers.get(firstDriverNumber).acronym}
                                    image={drivers.get(firstDriverNumber).image}
                                    primaryColor={team1Primary}
                                    accentColor={team1Accent}
                                    reverse={cardReverse1}
                                ></DriverCard> : <EmptyCard text="Select a driver" />}
                            </div>

                            <div className="driver-wrapper">
                                <CardControls
                                    title="Driver Selection"
                                    options={Array.from(drivers.keys()).map((number, idx) => (
                                        {
                                            id: idx,
                                            value: number,
                                            text: `${drivers.get(number).full_name}`
                                        }))}
                                    invalidOptions={new Set([drivers.get(firstDriverNumber)?.full_name ?? null])}
                                    onChanged={handleUpdatedDriver2}
                                    onReverseChanged={(val) => setCardReverse2(val)}
                                    layout="right"
                                />
                                {secondDriverNumber > -1 ? <DriverCard
                                    firstName={drivers.get(secondDriverNumber).first_name}
                                    lastName={drivers.get(secondDriverNumber).last_name}
                                    team={drivers.get(secondDriverNumber).team}
                                    number={drivers.get(secondDriverNumber).driver_number}
                                    acronym={drivers.get(secondDriverNumber).acronym}
                                    image={drivers.get(secondDriverNumber).image}
                                    primaryColor={team2Primary}
                                    accentColor={team2Accent}
                                    reverse={cardReverse2}
                                ></DriverCard> : <EmptyCard text="Select a driver" />}
                            </div>
                        </>
                            : <></>}
                    </div>
                    <DriverComparison></DriverComparison>
                </>
    );
}

export default Drivers;