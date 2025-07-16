import { createContext, useState, useContext, useEffect } from "react";

const GlobalStateContext = createContext();
export const useGlobalStateContext = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const value = {
        loading,
        setLoading
    }

    return (
        <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>
    )
}