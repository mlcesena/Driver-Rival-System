import "../css/Info.css"
import Silverstone from "../../public/tracks/silverstone.svg"
import TireSVG from "../assets/tire.svg"

import Curve from "../components/BackgroundElements/Curve";
import Carousel from "../components/Carousel/Carousel";
import CarouselCard from "../components/Carousel/CarouselCard";
import ModuleSection from "../components/ModuleSection";
import { NavLink } from "react-router-dom";
import Disclaimer from "../components/Disclaimer";
import TrackTires from "../components/Tracks/TrackTires";
import { useRef, useEffect, useState } from "react";

function Info() {
    const generalRef = useRef(null);
    const raceRef = useRef(null);
    const trackLogRef = useRef(null);
    const ruleRegRef = useRef(null);
    const [activeSection, setActiveSection] = useState(0);
    const [activeStates, setActiveStates] = useState([true, false, false, false]);

    useEffect(() => {
        window.addEventListener("scroll", updateActiveSection);
        updateActiveSection();
        return () => {
            window.removeEventListener("scroll", updateActiveSection);
        };
    }, []);

    function updateActiveSection() {
        const currentSection = getCurrentSection();

        let newStates = [false, false, false, false];
        newStates[currentSection] = true;

        setActiveSection(currentSection);
        setActiveStates(newStates);
    }

    function getCurrentSection() {
        const viewport = document.documentElement.clientHeight;
        const generalRefY = generalRef.current?.getBoundingClientRect().y;
        const generalRefHeight = generalRef.current?.getBoundingClientRect().height;
        const raceRefY = raceRef.current?.getBoundingClientRect().y;
        const raceRefHeight = raceRef.current?.getBoundingClientRect().height;
        const trackLogRefY = trackLogRef.current?.getBoundingClientRect().y;
        const trackLogRefHeight = trackLogRef.current?.getBoundingClientRect().height;
        const ruleRegRefY = ruleRegRef.current?.getBoundingClientRect().y;
        const ruleRegRefHeight = ruleRegRef.current?.getBoundingClientRect().height;

        if (
            viewport > generalRefY &&
            viewport < (raceRefY + (raceRefHeight * 1) / 3)
        ) {
            return 0;
        }

        if (
            viewport > (raceRefY + (raceRefHeight * 1) / 4) &&
            viewport < (trackLogRefY + (trackLogRefHeight * 1) / 4)
        ) {
            return 1;
        }

        if (
            viewport > (trackLogRefY + (trackLogRefHeight * 1) / 4) &&
            viewport < (ruleRegRefY + (ruleRegRefHeight * 1) / 4)
        ) {
            return 2;
        }

        if (viewport > (ruleRegRefY + ruleRegRefHeight * 1 / 4)) {
            return 3;
        }

        return 0;
    }


    return (
        <div className="info-content">
            <ModuleSection title={"General"} id={"General"} ref={generalRef} active={activeStates[0]}>
                <Carousel
                    children={[
                        <CarouselCard
                            title="What is Formula 1?"
                            body="Starting in 1950, Formula 1 is the pinnacle of single-seater motor racing. Teams work to develop the best car to score the most points each race weekend. All of the teams and their drivers compete for points awarded based on finishing position. These points contribute to their Constructor and Driver World Championship rankings.">
                            <Curve option={0} stroke={"#323232"} className="fg-svg-element" style={{ top: "70%", left: "40%", rotate: "90deg", transform: "scaleY(-1)" }} />
                        </CarouselCard>,
                        <CarouselCard
                            title="Teams and Drivers"
                            body="There are 10 teams, also known as constructors. Each of them feature 2 drivers who compete head to head against both each other and the other drivers on the grid. Drivers offer unique driving styles that can help teams determine the best race strategies to maximize point scoring.">
                            <Curve option={2} stroke={"#323232"} className="fg-svg-element" style={{ top: "35%", left: "-10%", rotate: "90deg", transform: "scaleX(-1)" }} />
                        </CarouselCard>,
                        <CarouselCard
                            title="Where do they race?"
                            body="Formula 1 Grand Prix weekends take place in over 20 countries around the world. Race venues are spread throughout Europe, Asia, North America, South America, and the Middle East. In the current calendar, there is a mix of both permanent tracks and temporary street circuits.">
                            <Curve option={0} stroke={"#323232"} className="fg-svg-element" style={{ top: "-20%", left: "55%", rotate: "0deg", transform: "scaleY(-1)" }} />
                        </CarouselCard>]}
                />
            </ModuleSection>
            <ModuleSection title={"Racing"} id={"Racing"} ref={raceRef} active={activeStates[1]}>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <div>
                            <h1 className="fs-sub-heading accent">How Race Weekends Work</h1>
                            <div className="divider" style={{ "--divider-margin": "1rem" }}></div>
                        </div>
                        <div className="info-text-block" style={{ display: "flex" }}>
                            <h3 className="info-text-decor">1</h3>
                            <span>
                                <h2 className="fs-body ff-primary">Practice</h2>
                                <p>
                                    Officially kicking off on Friday, standard Formula 1 race weeks include 3 free practice sessions. These 1 hour long sessions allow teams and drivers to learn about the circuit, experiment with different race strategies, test out variations on car setup, and see where they stack up against the rest.
                                </p>
                            </span>
                        </div>
                        <div className="info-text-block" style={{ display: "flex" }}>
                            <h3 className="info-text-decor">2</h3>
                            <span>
                                <h2 className="fs-body ff-primary">Qualifying</h2>
                                <p>
                                    After the 3 free practices conclude, a 3 round qualifying session (Q1, Q2, Q3) is held. In each round of qualifying, drivers compete to drive the fastest lap around the circuit. At the end of the first 2 rounds, the 5 slowest drivers are eliminated and will start the race from the position they finished. The driver with the fastest time at the end of Q3 earns "pole position" and starts in the best spot at the front of the grid.
                                </p>
                            </span>
                        </div>
                        <div className="info-text-block" style={{ display: "flex" }}>
                            <h3 className="info-text-decor">3</h3>
                            <span>
                                <h2 className="fs-body ff-primary">Race</h2>
                                <p>
                                    Sundays feature the actual race where the drivers and teams compete for points. While the number of laps and total race duration vary by track, most races are around 1 hour and 30 minutes.
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <div>
                            <h1 className="fs-sub-heading accent">Race Formats and Point Scoring</h1>
                            <div className="divider" style={{ "--divider-margin": "1rem" }}></div>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Sprint Overview</h2>
                            <p>
                                In addition to the standard race weekend format, Formula 1 added the Sprint as an alternative weekend structure. This format has a lot of similarities, but rather than having 3 free practice sessions, teams and drivers only get 1. Replacing the other 2 practices is Sprint Qualifying and the Sprint Shootout. The rest of the weekend remains unchanged in its format.
                            </p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Sprint Qualifying and Racing</h2>
                            <p>
                                Sprint Qualifying follows the same 3 round setup as standard Qualifying. SQ1 and SQ2 see the slowest 5 drivers eliminated and SQ3 has the 10 fastest drivers compete for Sprint Pole Position. The Sprint Shootout is ran with the same rules and layout as a race, but is substantially shorter, typically only one third of the total race length. Another difference is that the total points available is lower and fewer positions can score them.
                            </p>
                        </div>
                        <div className="point-container">
                            <div className="content-container-small">
                                <h2 className="fs-body ff-primary">Standard Point Structure</h2>
                                <p>
                                    P1 = 25<br></br>
                                    P2 = 18<br></br>
                                    P3 = 15<br></br>
                                    P4 = 12<br></br>
                                    P5 = 10<br></br>
                                    P6 = 8<br></br>
                                    P7 = 6<br></br>
                                    P8 = 4<br></br>
                                    P9 = 2<br></br>
                                    P10 = 1<br></br>
                                    P11-20 = 0<br></br>
                                </p>
                            </div>
                            <div className="content-container-small">
                                <h2 className="fs-body ff-primary">Sprint Point Structure</h2>
                                <p>
                                    P1 = 8<br></br>
                                    P2 = 7<br></br>
                                    P3 = 6<br></br>
                                    P4 = 5<br></br>
                                    P5 = 4<br></br>
                                    P6 = 3<br></br>
                                    P7 = 2<br></br>
                                    P8 = 1<br></br>
                                    P9-20 = 0<br></br>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ModuleSection>
            <ModuleSection title={"Tracks and Logistics"} id={"TrackLog"} ref={trackLogRef} active={activeStates[2]}>
                <div className="content-container-large info-grid-wrapper" style={{ display: "grid" }}>
                    <div className="info-text-container">
                        <div>
                            <h1 className="fs-sub-heading accent">Tracks</h1>
                            <div className="divider" style={{ "--divider-margin": "1rem" }}></div>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Overview</h2>
                            <p>Hosted across 20 countries around the world, all of the tracks on the Formula 1 calendar offer a unique experience for drivers and teams. Each utilizes a variety of low, medium, and high speed corners paired with long straights where drivers can reach an excess of 215 MPH / 350 KPH.
                                <br></br>
                                <br></br>
                                Circuits typically include some changes in elevation which provide an additional challenge.
                            </p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Layouts and Variations</h2>
                            <p>
                                While a majority of F1 circuits are permanent tracks that are used throughout the year by other racing series, some are temporary street circuits. These are typically hosted on public roads and undergo a hefty transformation to prepare it for the race weekend. The most infamous street circuit on the F1 calendar is the Monaco Grand Prix, where the entire city of Monaco is captivated by the extreme precision that the drivers dare to put onto display.
                                <br></br>
                                <br></br>
                                Alongside all of the other factors, circuits feature varying degrees of tire wear. While some are extremely harsh of the tire compounds, requiring drivers to make multiple pit stops, other tracks may be more suited to the single mandatory stop.
                                <br></br>
                                <br></br>
                                Race tracks are also categorized based on a spectrum from maximum top speed or maximum downforce. Tracks like Monza have multiple long straights and few corners. In contrast, the Hungaroring in Hungary utilizes few straights, but a lot of technical corners.
                            </p>
                        </div>
                    </div>
                    <div className="info-track-container">
                        <img src={Silverstone}></img>
                        <Disclaimer
                            title="Learn More"
                            description="Take an in-depth look at all of the current F1 tracks"
                            children={
                                <NavLink to={`/tracks`} style={{ width: "fit-content" }}>
                                    <button className="button">
                                        <span className="material-symbols-outlined" style={{ color: "white" }}>
                                            arrow_right_alt
                                        </span>
                                    </button>
                                </NavLink>}
                        />
                    </div>
                </div>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <div>
                            <h1 className="fs-sub-heading accent">Tires and Allocations</h1>
                            <div className="divider" style={{ "--divider-margin": "1rem" }}></div>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Tire Compounds and Usage</h2>
                            <p>
                                For dry conditions, 3 different slick tire compounds are available, Soft, Medium, and Hard.
                                Each of these compounds offer varying levels or grip and durability.
                                Soft tires provide the fastest lap times and the most control while wearing out the quickest.
                                They are primarily used during qualifying or at tracks with low tire degradation.
                                Hard tires are on the other end of the spectrum.
                                Typically having the lowest level of mechanical grip and slowest lap times.
                                The benefit being they are the longest lasting compound.
                                In the middle, are Medium tires with a blend of the benefits and drawbacks of Soft and Hard compounds.
                                Drivers are required to use at least 2 different compounds during a race, assuming dry conditions.
                                <br></br>
                                <br></br>
                                In cases of rain and wet weather conditions, Intermediate and Full Wet tires are available. In contrast to slicks, both of these compounds feature treads to shed water and improve grip in slippery conditions. Intermediates are the more popular option due to faster lap times and the rare need of Full Wets. However, both are substantially slower than any of the dry tires.
                                <br></br>
                                <br></br>
                                Each weekend, the 3 tire compounds are selected based on the spectrum below. C1 tires are the hardest available, while C6 are the softest. Based on the circuit and a variety of other factors, 3 compounds are chosen. Note that the hard tire in one race may be the soft in another.
                            </p>
                        </div>
                        <TrackTires></TrackTires>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Weekend Allocation</h2>
                            <p>
                                During standard race weekends, teams have access to 13 sets of dry tires, 4 sets of intermediates and 3 sets of full wets for each driver. Additionally, drivers to make it into Q3 during qualifying receive an additional set of soft tires.
                                <br></br>
                                <br></br>
                                At Sprint weekends, the dry allocation is reduced to 12 (6 soft, 4 medium, 2 hard). Wet weather tires are changed to 5 sets of inters and 2 full wets.
                            </p>
                        </div>
                    </div>
                </div>
            </ModuleSection>
            <ModuleSection title={"Rules and Regulations"} id={"RuleReg"} ref={ruleRegRef} active={activeStates[3]}>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <div>
                            <h1 className="fs-sub-heading accent">Flags and Infringements</h1>
                            <div className="divider" style={{ "--divider-margin": "1rem" }}></div>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary flag-indicator" style={{ "--indicator-clr": "var(--clr-accent-400)" }}>Yellow Flags</h2>
                            <p>The most common flag is the Yellow Flag, indicating hazards on track (debris, car off track, etc.). Drivers are requried to slow down and are forbidden from overtaking. There are two types of these flags, single and double. Single means there is a hazard and to proceed with caution, while double is are more serious instance and driver must slow even more.</p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary flag-indicator" style={{ "--indicator-clr": "var(--clr-primary-400)" }}>Red Flags</h2>
                            <p>Red Flags result in an immediate suspense of the session. Typically used during crashes or extreme track hazards. Drivers must immediately slow their speed and safely return to the pitlane.</p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary flag-indicator" style={{ "--indicator-clr": "var(--clr-tertiary-400)" }}>Blue Flags</h2>
                            <p>Blue Flags notify drivers that another car is approaching and to safely let them pass. During the race a driver will see one when they are going to be lapped.</p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary flag-indicator" style={{ "--indicator-clr": "var(--clr-neutral-900)" }}>Black Flags</h2>
                            <p>Although rare, Black Flags signify immediate disqualification of a driver. Drivers must return to the pit lane and retire from the session. They are only used in cases of extreme rule violations, serious instances of unsafe driving, or receiving outside assistance while on track.</p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Track Limits</h2>
                            <p>Around each circuit are a pair of solid white lines indicating the track boundaries. Drivers must keep at least one tire on or within these lines or else face track limit violations. During qualifying, exceeding track limits results in the deletion of a drivers lap time. While in the race, drivers receive a warning for the first two violations. A third results in a black and white flag warning and the fourth warrents a 5 second penalty. Any violation after number four results in increasing time penalites.</p>
                        </div>
                    </div>
                </div>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <div>
                            <h1 className="fs-sub-heading accent">Penalties</h1>
                            <div className="divider" style={{ "--divider-margin": "1rem" }}></div>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Time Penalties</h2>
                            <p>Typically due to on track violations (track limits, jump starts, failing to slow in the pitlane, etc.) during a race/sprint, drivers can receive time based penalites that are added to their finish time. Drivers must serve these penalites during the racing when they come in for a pitstop (stop and go) or have them applied at the end.</p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Grid Penalties</h2>
                            <p>Grid penalites are given to a driver for exceeding car part allocations or for various rule violations such as colliding with another driver. They are applied to their qualifying position for the race, causing them to drop 5 to 10 place. In some cases, drivers can receive 15 place grid penalites, resulting in them needing to start from the back of the grid.</p>
                        </div>
                        <div className="info-text-block">
                            <h2 className="fs-body ff-primary">Fines</h2>
                            <p>Alongside the other forms of penalites, teams and drivers can receive monetary fines. These are issued by the FIA when drivers or teams commit rule infractions on track or during the season. Teams are responsible for paying fines commited by themselves and their drivers.</p>
                        </div>
                    </div>
                </div>
            </ModuleSection>

            <div className="divider" style={{ marginBlock: "3rem", "--divider-color": "var(--clr-neutral-100)" }}></div>

            <section>
                <div className="content-container-large">
                    <div className="info-text-container" style={{ maxWidth: "none" }}>
                        <div>
                            <h1 className="fs-sub-heading accent">About This Site</h1>
                            <div className="divider" style={{ "--divider-margin": "1rem" }}></div>
                        </div>
                        <p>Driver Rival System was created as a passion project to share an interactive view of Formula 1 and its technical details. The goal was to present users with a blend of in-depth data in an easy to understand and clean look. The aim was to expand beyond what is shown on track and provide users with tools to compare season statistics and learn more about one of the most exiciting forms of motor racing.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Info;