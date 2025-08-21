import "../css/main.css"
import "./Footer.css"
function Footer() {
    return (
        <>
            <div className="link-container">
                <h2>External Resources</h2>
                <hr className="divider"></hr>
                <ul className="external-link-list">
                    <li className="external-link"><a href="https://www.formula1.com" target="_blank">Official Formula 1 Site</a></li>
                    <li className="external-link"><a href="https://openf1.org" target="_blank">OpenF1</a></li>
                    <li className="external-link"><a href="https://github.com/lipis/flag-icons" target="_blank">Flags by lipis</a></li>
                    <li className="external-link"><a href="https://recharts.org/en-US" target="_blank">ReCharts</a></li>
                </ul>
            </div >
            <p className="creation-tag">Created by <a href="https://github.com/mlcesena" target="_blank">Michael Cesena</a> (2025)</p>
        </>
    );
}

export default Footer;