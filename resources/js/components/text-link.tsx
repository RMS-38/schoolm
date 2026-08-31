import type{ ReactNode } from "react"

export const TextLink = ({ children }: { children: ReactNode }) => {
    return <p
        className="font-medium text-emerald-500 hover:underline hover:font-bold
        hover:text-blue-500"
    >{children}</p>
}