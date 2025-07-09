function DriverCompItem({ title = "Null", team1 = "", team2 = "", stat1 = 0, stat2 = 0 }) {
    return (
        <li className="driver-stat-item">
            <h2>{title}</h2>
            <div className="comparison-stat">
                <span className='comparison-bar' style={{ backgroundColor: `${team1}` }}>{stat1}</span>
                <span className='comparison-bar' style={{ backgroundColor: `${team2}` }}> {stat2}</span>
            </div>
        </li >
    )
}

export default DriverCompItem;