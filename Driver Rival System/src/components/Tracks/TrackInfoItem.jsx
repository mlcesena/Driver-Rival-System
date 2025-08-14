function TrackInfoItem({ title = "null", content = "", icon = "" }) {
    return (
        <span className="track-info-item">
            <span className="material-symbols-outlined">{icon}</span>
            <div>
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        </span>
    );
}

export default TrackInfoItem;