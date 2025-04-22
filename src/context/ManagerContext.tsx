import { useMediaQuery, useTheme } from "@mui/material";
import { EMPTY } from "@utils/string-utils"
import React, { createContext, useEffect, useState } from "react"

interface managerContextType {
    data: string | number;
    setData: React.Dispatch<React.SetStateAction<string>>;
    isMobile: boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;

}

export const ManagerContext = createContext<managerContextType>({
    data: EMPTY,
    setData: () => { },
    isMobile: false,
    setIsMobile: () => { },
})

export const ManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [data, setData] = useState<string>(EMPTY);
    const [isMobile, setIsMobile] = useState<boolean>(matches);

    useEffect(() => {
        setIsMobile(matches);
    }, [matches])

    return (
        <ManagerContext.Provider value={{
                data, setData, isMobile, setIsMobile
            }}
        >
            {children}
        </ManagerContext.Provider>
    )
}