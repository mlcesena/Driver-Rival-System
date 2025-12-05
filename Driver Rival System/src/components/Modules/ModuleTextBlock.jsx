import "../../css/Info.css"
function ModuleTextBlock({
    title = "Null",
    headerClassNames = "",
    headerStyles,
    bodyText = "",
    bodyDecor,
    bodyDecorOrientation = "left" }) {

    return (
        <div className="info-text-block" style={{ display: "flex" }}>
            {bodyDecorOrientation === "left" && bodyDecor}
            <span>
                <h2 className={`fs-body ff-primary ${headerClassNames}`} style={headerStyles}>{title}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>
                    {bodyText}
                </p>
            </span>
            {bodyDecorOrientation === "right" && bodyDecor}
        </div>
    );
}

export default ModuleTextBlock;