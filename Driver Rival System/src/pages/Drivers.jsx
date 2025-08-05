import { useGlobalStateContext } from "../contexts/GlobalStateContext";
import { useDriverContext } from "../contexts/DriverContext";
import { useState, useEffect } from "react";
import DriverCard from '../components/Cards/DriverCard'
import Comparison from '../components/Comparison/Comparison'
import "../css/main.css"
import '../App.css'
import ComboxBox from "../components/ComboBox/ComboBox";
import EmptyCard from "../components/Cards/EmptyCard";
import LoadScreen from "../components/LoadScreen/LoadScreen";

function Drivers() {
    const { loading } = useGlobalStateContext();
    const { drivers,
        firstDriverNumber,
        setFirstDriverNumber,
        secondDriverNumber,
        setSecondDriverNumber,
        team1Primary,
        team1Accent,
        team2Primary,
        team2Accent } = useDriverContext();

    const handleUpdatedDriver1 = (idx) => {
        // FIX ME: find better solution for getting driver number
        setFirstDriverNumber(drivers.keys().toArray()[idx]);
    };

    const handleUpdatedDriver2 = (idx) => {
        setSecondDriverNumber(drivers.keys().toArray()[idx]);
    };

    useEffect(() => {

    }, [drivers])

    return (
        loading ? <LoadScreen></LoadScreen> :
            <>
                <div className="driver-container">
                    {drivers.size > 0 ? <>
                        <div className="driver-wrapper">
                            <ComboxBox
                                title="Driver Selection"
                                options={Array.from(drivers.keys()).map((number, idx) => (
                                    {
                                        id: idx,
                                        value: `${drivers.get(number).full_name}`,
                                    }))}
                                updaterFunction={handleUpdatedDriver1}
                                searchable={true}>
                            </ComboxBox>
                            {firstDriverNumber > -1 ? <DriverCard
                                firstName={drivers.get(firstDriverNumber).first_name}
                                lastName={drivers.get(firstDriverNumber).last_name}
                                team={drivers.get(firstDriverNumber).team}
                                number={drivers.get(firstDriverNumber).driver_number}
                                acronym={drivers.get(firstDriverNumber).acronym}
                                image={drivers.get(firstDriverNumber).image}
                                primaryColor={team1Primary}
                                accentColor={team1Accent}
                            ></DriverCard> : <EmptyCard></EmptyCard>}
                        </div>

                        <div className="driver-wrapper align-right">
                            <ComboxBox
                                title="Driver Selection"
                                options={Array.from(drivers.keys()).map((number, idx) => (
                                    {
                                        id: idx,
                                        value: `${drivers.get(number).full_name}`
                                    }))}
                                updaterFunction={handleUpdatedDriver2}
                                searchable={true}>
                            </ComboxBox>
                            {secondDriverNumber > -1 ? <DriverCard
                                firstName={drivers.get(secondDriverNumber).first_name}
                                lastName={drivers.get(secondDriverNumber).last_name}
                                team={drivers.get(secondDriverNumber).team}
                                number={drivers.get(secondDriverNumber).driver_number}
                                acronym={drivers.get(secondDriverNumber).acronym}
                                image={drivers.get(secondDriverNumber).image}
                                primaryColor={team2Primary}
                                accentColor={team2Accent}
                            ></DriverCard> : <EmptyCard></EmptyCard>}
                        </div>
                    </>
                        : <></>}
                </div>
                <Comparison></Comparison>
            </>
    );
}

export default Drivers;