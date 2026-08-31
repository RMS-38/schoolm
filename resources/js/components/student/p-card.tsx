import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const PCard = ({
    icon: Icon,
    text,
    className }: {
        icon: LucideIcon;
        text: string;
        className?: string;
    }) => {
    return (
        <>
            <p
                className={cn("text-xs flex gap-1 items-center", className)}
            >
                <Icon size={15}/>
                {text}
            </p>
        </>
    )
}