import { CircleCheckBig, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";


export default function HomeLayout({children}:{children: ReactNode}){
    return (
        <div
            style={{ backgroundImage: "url('/images/font-home.png')" }}
            className="min-h-screen flex justify-center items-center bg-no-repeat bg-cover"
        >
            <div className="text-center w-full flex items-center justify-center">
                {children}
            </div>
            <Toaster
                icons={{ 
                    success: <CircleCheckBig className="text-green-500 mx-2" />,
                    error: <TriangleAlert className="text-red-500 mx-2"/>
                 }}
            />
        </div>
    )
}