import { useGlobalStateContext } from "../contexts/GlobalStateContext";
import { useDriverContext } from "../contexts/DriverContext";
import { useState, useEffect } from "react";
import DriverCard from '../components/Cards/DriverCard'
import ComparisonBarChart from '../components/Comparison/ComparisonBarChart'
import DonutChartContainer from '../components/Comparison/DonutChartContainer'
import "../css/main.css"
import '../App.css'
import ComboxBox from "../components/ComboBox/ComboBox";
import EmptyCard from "../components/Cards/EmptyCard";
import Header from "../components/Header";
import LoadScreen from "../components/LoadScreen/LoadScreen";

function Home() {
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
                <Header></Header>
                <div className="driver-container">
                    {drivers.size > 0 ? <>
                        <div className="driver-wrapper">
                            <ComboxBox
                                title="Driver Selection"
                                options={Array.from(drivers.keys()).map((number, idx) => (
                                    {
                                        id: idx,
                                        value: `${drivers.get(number).fullName}`,
                                    }))}
                                updaterFunction={handleUpdatedDriver1}
                                searchable={true}>
                            </ComboxBox>
                            {firstDriverNumber > -1 ? <DriverCard
                                firstName={drivers.get(firstDriverNumber).firstName}
                                lastName={drivers.get(firstDriverNumber).lastName}
                                team={drivers.get(firstDriverNumber).team}
                                number={drivers.get(firstDriverNumber).number}
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
                                        value: `${drivers.get(number).fullName}`
                                    }))}
                                updaterFunction={handleUpdatedDriver2}
                                searchable={true}>
                            </ComboxBox>
                            {secondDriverNumber > -1 ? <DriverCard
                                firstName={drivers.get(secondDriverNumber).firstName}
                                lastName={drivers.get(secondDriverNumber).lastName}
                                team={drivers.get(secondDriverNumber).team}
                                number={drivers.get(secondDriverNumber).number}
                                acronym={drivers.get(secondDriverNumber).acronym}
                                image={drivers.get(secondDriverNumber).image}
                                primaryColor={team2Primary}
                                accentColor={team2Accent}
                            ></DriverCard> : <EmptyCard></EmptyCard>}
                        </div>
                    </>
                        : <></>}
                </div>
                <ComparisonBarChart title="Highlights"></ComparisonBarChart>
                <DonutChartContainer title="Race Statistics"></DonutChartContainer>
            </>
    );
}

export default Home;