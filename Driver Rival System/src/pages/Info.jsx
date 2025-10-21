import "../css/Info.css"

function Info() {
    return (
        <>
            <section className="info-section">
                <div style={{ display: "flex", gap: "1rem" }}>
                    <div className="content-container-large info-wrapper">
                        <div className="info-text-container">
                            <h1 className="fs-sub-heading">What is Formula 1?</h1>
                            <p>Starting in 1950, Formula 1 is the pinnacle of single-seater motor racing. Teams work to develop the best car to score the most points each race weekend. All of the teams and their drivers compete for position based points rewarded after each race weekend. These points go towards their Constructor and Driver world championship ranking.</p>
                        </div>

                        {/* <div className="vert-divider"></div> */}
                    </div>
                    <div className="content-container-large info-wrapper">
                        <div className="info-text-container">
                            <h1 className="fs-sub-heading">Teams and Drivers</h1>
                            <p>There are 10 teams, also known as constructors. Each of them feature 2 drivers who compete head to head against both each other and the other drivers on the grid. </p>
                        </div>

                        {/* <div className="vert-divider"></div> */}
                    </div>
                    <div className="content-container-large info-wrapper">
                        <div className="info-text-container">
                            <h1 className="fs-sub-heading">Where do they race?</h1>
                            <p>Formula 1 Grand Prix weekends take place in over 20 countries around the world. Race venues are spread throughout Europe, Asia, North America, South America, and the Middle East. In the current calendar, there is a mix of both permanent tracks and temporary street circuits.</p>
                        </div>

                        {/* <div className="vert-divider"></div> */}
                    </div>
                </div>
            </section>
            <section className="info-section">


                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <h1 className="fs-sub-heading">How Race Weekends Work</h1>
                        <p>
                            Officially kicking off on Friday, standard Formula 1 race weeks include 3 free practice sessions. These 1 hour long sessions allow teams and drivers to learn about the circuit, experiment with different race strategies, test out variations on car setup, and see where they stack up against the rest.
                            <br></br>
                            <br></br>
                            After the 3 free practices conclude, a 3 round qualifying session (Q1, Q2, Q3) is held. In each round of qualifying, drivers compete to drive the fastest lap around the circuit. At the end of the first 2 rounds, the 5 slowest drivers are eliminated and will start the race from the position they finished. The driver with the fastest time at the end of Q3 earns "pole position" and starts in the best spot at the front of the grid.
                            <br></br>
                            <br></br>
                            Sundays feature the actual race where the drivers and teams compete for points. While the number of laps and total race duration vary by track, most races are around 1 hour and 30 minutes.</p>
                    </div>

                    {/* <div className="vert-divider"></div> */}
                </div>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <h1 className="fs-sub-heading">Race Formats and Point Scoring</h1>
                        <p>
                            In addition to the standard race weekend format, Formula 1 added the Sprint as an alternative weekend structure. This format has a lot of similarities, but rather than having 3 free practice sessions, teams and drivers only get 1. Replacing the other 2 practices is Sprint Qualifying and the Sprint Shootout. The rest of the weekend remains unchanged in its format.
                            <br></br>
                            <br></br>
                            Sprint Qualifying follows the same 3 round setup as standard Qualifying. SQ1 and SQ2 see the slowest 5 drivers eliminated and SQ3 has the 10 fastest drivers compete for Sprint Pole Position. The Sprint Shootout is ran with the same rules and layout as a race, but is substantially shorter, typically only one third of the total race length. Another difference is that the total points available is lower and fewer positions can score them.
                            <br></br>
                            <br></br>
                        </p>
                        <div className="point-container">
                            <div>
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
                            <div >
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

                    {/* <div className="vert-divider"></div> */}
                </div>
            </section>
            <section className="info-section">
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <h1 className="fs-sub-heading">Tracks</h1>
                        <p>Hosted across 20 countries around the world, all of the tracks on the Formula 1 calendar offer a unique experience for drivers and teams. Each utilizes a variety of low, medium, and high speed corners paired with long straights where drivers can reach an excess of 215 MPH / 350 KPH.
                            <br></br>
                            <br></br>
                            Circuits typically include some changes in elevation which provide an additional challenge.
                            <br></br>
                            <br></br>
                            While a majority of F1 circuits are permanent tracks that are used throughout the year by other racing series, some are temporary street circuits. These are typically hosted on public roads and undergo a hefty transformation to prepare it for the race weekend. The most infamous street circuit on the F1 calendar is the Monaco Grand Prix, where the entire city of Monaco is captivated by the extreme precision that the drivers dare to put onto display.
                            <br></br>
                            <br></br>
                            Alongside all of the other factors, circuits feature varying degrees of tire wear. While some are extremely harsh of the tire compounds, requiring drivers to make multiple pit stops, other tracks may be more suited to the single mandatory stop.
                            <br></br>
                            <br></br>
                            Race tracks are also categorized based on a spectrum from maximum top speed or maximum downforce. Tracks like Monza have multiple long straights and few corners. In contrast, the Hungaroring in Hungary utilizes few straights, but a lot of technical corners.</p>
                    </div>

                    {/* <div className="vert-divider"></div> */}
                </div>
                <div className="content-container-large info-wrapper">
                    <div className="info-text-container">
                        <h1 className="fs-sub-heading">Flags and Infringements</h1>

                    </div>

                    {/* <div className="vert-divider"></div> */}
                </div>
            </section>

            <div className="divider" style={{ marginBlock: "3rem" }}></div>

            <section>
                <div className="content-container-large">
                    <div className="info-text-container" style={{ maxWidth: "none" }}>
                        <h1 className="fs-sub-heading">About This Site</h1>
                        <p>Driver Rival System was created as a passion project to share an interactive view of Formula 1 and its technical details. The goal was to present users with a blend of in-depth data in an easy to understand and clean look. The aim was to expand beyond what is shown on track and provide users with tools to compare season statistics and learn more about one of the most exiciting forms of motor racing.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Info;