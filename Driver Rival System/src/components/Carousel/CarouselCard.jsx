function CarouselCard({ title = "", body = "", children }) {
    return (
        <>
            <div className="content-container-large" style={{ height: "100%", paddingInline: "1.5rem" }}>
                <div className="info-text-container">
                    <h1 className="fs-sub-heading">{title}</h1>
                    {/* <div className="divider"></div> */}
                    <p>{body}</p>
                </div>
                {children}
            </div >
        </>
    )
}

export default CarouselCard;