import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export const SubmitBtn = (
    {
        children,
        processing,
        className,
        type = "submit",
        onClick,
        isDirty=true
    }: {
            children: ReactNode,
            processing: boolean,
            className?: string,
            type?: "submit" | "button" | "reset",
            onClick?: () => void,
            isDirty?:boolean
        })=><Button
        type={type}
        disabled={processing || !isDirty}
        onClick={onClick}
            className={cn("w-full relative", className)}
        >
            {processing && <span
                className="absolute font-bold text-emerald-950 bg-emerald-200/60 flex justify-center items-center inset-0"
            >
                <Spinner className="size-4"/>
            </span>}
            {children}
        </Button>