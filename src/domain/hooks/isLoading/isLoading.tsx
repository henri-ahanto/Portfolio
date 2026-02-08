'use client'

import { LoadingProps } from "@/domain/entities/types"
import { useEffect, useState, createContext, useContext } from "react"

const LoadingContext = createContext<{isLoaded : boolean}>({isLoaded : false})

export const LoadingProvider = ({ children, loadcomponent }: LoadingProps) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        setIsLoaded(true);
    }, [])
    return(
        <LoadingContext.Provider value={{isLoaded}} >
            {
                isLoaded ?
                children :
                loadcomponent
            }
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const loading = useContext(LoadingContext)
    if (!loading) 
        throw new Error("LoadingContext must be used with LoadContext provider")
    return loading
}