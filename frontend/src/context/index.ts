// @ts-nocheck
import localforage from "localforage";
import { createContext, useContext } from "react";

const WastewiseContext = createContext({});

const WastewiseProvider = ({ children }) => {
    let wastewiseStore = localforage.createInstance({
        name: "wastewiseStore"
    });

    return (
        <WastewiseContext.Provider value= {{ wastewiseStore }
}>
    { children }
    < /WastewiseContext.Provider>
    );
}

export const useWasteWiseContext = () => useContext(WastewiseContext);
export default WastewiseProvider;