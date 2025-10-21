function curve90(className, style) {
    return <>
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
            <path d="M33 200 L33 133 
           A100 100 0 0 1 133 33 
           L200 33"
                stroke="#262524" strokeWidth="13" fill="none" />

            <path d="M47 200 L47 133 
           A87 87 0 0 1 133 47
           L200 47"
                stroke="#141413" strokeWidth="13" fill="none" />

            <path d="M60 200 L60 133 
           A73 73 0 0 1 133 60
           L200 60"
                stroke="#262524" strokeWidth="13" fill="none" />

            <path d="M73 200 L73 133 
           A60 60 0 0 1 133 73
           L200 73"
                stroke="#141413" strokeWidth="13" fill="none" />

            <path d="M87 200 L87 133 
           A47 47 0 0 1 133 87
           L200 87"
                stroke="#262524" strokeWidth="13" fill="none" />
        </svg>
    </>
}

function curveU(className, style) {
    return <>
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
            <path d="
                    M33 300 
                    L33 113 
           A100 100 0 0 1 133 13 
           L250 13
           A100 100 0 0 1 350 113
           L350 300"
                stroke="#262524" strokeWidth="13" fill="none" />

            <path d="
                    M47 300 
                    L47 113 
           A87 87 0 0 1 133 26
           L250 26
           A87 87 0 0 1 337 113
           L337 300"
                stroke="#141413" strokeWidth="13" fill="none" />

            <path d="
                    M60 300 
                    L60 113 
           A73 73 0 0 1 133 39
           L250 39
           A73 73 0 0 1 324 113
           L324 300"
                stroke="#262524" strokeWidth="13" fill="none" />

            <path d="
                    M73 300 
                    L73 113 
           A60 60 0 0 1 133 52
           L250 52
           A60 60 0 0 1 311 113
           L311 300"
                stroke="#141413" strokeWidth="13" fill="none" />

            <path d="
                    M87 300 
                    L87 113 
           A47 47 0 0 1 133 65
           L250 65
           A47 47 0 0 1 298 113
           L298 300"
                stroke="#262524" strokeWidth="13" fill="none" />
        </svg>
    </>
}

function curveSnake(className, style) {
    return (<>
        <svg width="310" height="400" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
            <path d="
    M13 400
    L13 250
    A100 100 0 0 1 113 150
    L200 150
    A40 35 0 0 0 200 75
    L13 75
  " stroke="#262524" strokeWidth="13" fill="none" />

            <path d="
    M26 400
    L26 250
    A87 87 0 0 1 113 163
    L200 163
    A53 48 0 0 0 200 62
    L13 62
  " stroke="#141413" strokeWidth="13" fill="none" />

            <path d="
    M39 400
    L39 250
    A73 73 0 0 1 113 176
    L200 176
    A66 61 0 0 0 200 49
    L13 49
  " stroke="#262524" strokeWidth="13" fill="none" />

            <path d="
    M52 400
    L52 250
    A60 60 0 0 1 113 189
    L200 189
    A79 74 0 0 0 200 36
    L13 36
  " stroke="#141413" strokeWidth="13" fill="none" />

            <path d="
    M65 400
    L65 250
    A47 47 0 0 1 113 202
    L200 202
    A92 87 0 0 0 200 23
    L13 23
  " stroke="#262524" strokeWidth="13" fill="none" />
        </svg>
    </>);
}

function Curve({ option = 0, className = "", style = {} }) {
    let element;

    switch (option) {
        case 0:
            return curve90(className, style);
        case 1:
            return curveU(className, style);
        case 2:
            return curveSnake(className, style);

        default:
            return curve90(className, style);
    }
}

export default Curve;