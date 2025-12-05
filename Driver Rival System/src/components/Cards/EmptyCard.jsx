import "./Card.css"

function EmptyCard({ text = "null" }) {
    return (
        <div className="card-wrapper">
            <div className="card empty-card"><h1>{text}</h1></div>
        </div>
    )
}

export default EmptyCard;