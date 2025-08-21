export function convertCountryCode(alpha3) {
    switch (alpha3.toUpperCase()) {
        case "ARG":
            return "ar";
        case "AUS":
            return "au";
        case "AUT":
            return "at";
        case "AZE":
            return "az";
        case "BEL":
            return "be";
        case "BRA":
            return "br";
        case "BHR":
            return "bh";
        case "CAN":
            return "ca";
        case "CHN":
            return "cn";
        case "EGY":
            return "eg";
        case "FRA":
            return "fr";
        case "HUN":
            return "hu";
        case "DEU":
            return "de";
        case "ITA":
            return "it";
        case "JPN":
            return "jp";
        case "KSA":
            return "sa";
        case "MEX":
            return "mx";
        case "MCO":
            return "mc";
        case "NLD":
            return "nl";
        case "NZL":
            return "nz";
        case "ESP":
            return "es";
        case "QAT":
            return "qa";
        case "SWE":
            return "ch";
        case "SGP":
            return "sg";
        case "THA":
            return "th";
        case "GBR":
            return "gb";
        case "USA":
            return "us";
        case "ARE":
            return "ae";
        default:
            return "";
    }
}

export function convertTeamColors(teamName) {
    switch (teamName) {
        case "Red Bull Racing":
            // return ["#171A60", "#FA142A"];
            // return ["#1B1F4F", "#C12B30"]
            return ["#213369", "#C12B30"]
        case "McLaren":
            // return ["#FD8003", "#141520"];
            return ["#B5631F", "#1E1E1E"];
        case "Kick Sauber":
            // return ["#04E703", "#000000"];
            return ["#3A6B36", "#121212"];
        case "Racing Bulls":
            // return ["#1534CB", "#F23821"];
            return ["#1B4F72", "#C12B30"];
        case "Alpine":
            // return ["#0577C8", "#EC8BC6"];
            return ["#1B4F72", "#99627A"];
        case "Mercedes":
            // return ["#09F5D2", "#000000"];
            // return ["#2BADA0", "#121212"];
            return ["#4B958D", "#121212"];
        case "Aston Martin":
            // return ["#015A50", "#E1FF39"];
            return ["#004225", "#D1B66A"];
        case "Williams":
            // return ["#1967DA", "#141C21"];
            return ["#1B4F72", "#1E1E1E"];
        case "Ferrari":
            // return ["#FD0101", "#FFED03"];
            return ["#C12B30", "#D1B66A"];
        case "Haas F1 Team":
            // return ["#AFAFAF", "#D5001C"];
            return ["#888888", "#C12B30"];
        default:
            return ["#FFFFFF", "#FFFFFF"];
    }
}

export function isDark(color) {
    let c = color.substring(1);      // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >> 8) & 0xff;  // extract green
    let b = (rgb >> 0) & 0xff;  // extract blue

    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return (luma < 50);
}