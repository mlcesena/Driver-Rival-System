function shapeFlag(className, style) {
    return (<>
        <svg width="112" height="96" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
            <rect width="16" height="16" x="0" y="0" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="16" y="0" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="32" y="0" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="48" y="0" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="64" y="0" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="80" y="0" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="96" y="0" fill="var(--clr-neutral-800)" />

            <rect width="16" height="16" x="0" y="16" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="16" y="16" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="32" y="16" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="48" y="16" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="64" y="16" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="80" y="16" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="96" y="16" fill="var(--clr-neutral-900)" />

            <rect width="16" height="16" x="0" y="32" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="16" y="32" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="32" y="32" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="48" y="32" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="64" y="32" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="80" y="32" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="96" y="32" fill="var(--clr-neutral-800)" />

            <rect width="16" height="16" x="0" y="48" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="16" y="48" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="32" y="48" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="48" y="48" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="64" y="48" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="80" y="48" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="96" y="48" fill="var(--clr-neutral-900)" />

            <rect width="16" height="16" x="0" y="64" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="16" y="64" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="32" y="64" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="48" y="64" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="64" y="64" fill="var(--clr-neutral-800)" />
            <rect width="16" height="16" x="80" y="64" fill="var(--clr-neutral-900)" />
            <rect width="16" height="16" x="96" y="64" fill="var(--clr-neutral-800)" />
        </svg>
    </>)
}

function Shape({ option = 0, className = "", style = {} }) {
    switch (option) {
        case 0:
            return shapeFlag(className, style);
        default:
            return shapeFlag(className, style);
    }
}

export default Shape;