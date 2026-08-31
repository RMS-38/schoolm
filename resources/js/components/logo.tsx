import { cn } from "@/lib/utils"

export const Logo = (
    {
        className,
        width = 25,
    }: {
            className?: string,
            width?:number
    }) => {
    return (
        <div className={cn("flex justify-center md:justify-start gap-2", className)}>
            <a
                href="/"
                className="flex items-center w-full font-medium"
            >
                <div
                    className="flex w-25 items-center justify-center"
                >
                    <img
                        src="/logo.png" alt="logo"
                        className={`w-${width}`}
                    />
                </div>
            </a>
        </div>
    )
}