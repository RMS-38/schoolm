import { usePage } from "@inertiajs/react";
import { CircleCheckBig, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import type{ ReactNode} from "react"
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useTheme from "@/hooks/use-theme";

// import { useRoute } from "ziggy-js";

export default function Layout({ children }: { children: ReactNode }) {
    // const route = useRoute();
    const { props } = usePage();
    
    const user = props.auth?.user;
    const { theme, setTheme } = useTheme();

    useEffect(()=>setTheme(user?.theme ?? 'system'),[])
    
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="w-full">
                <SidebarTrigger/>
                {children} 
            </main>
            <Toaster
                icons={{ 
                    success: <CircleCheckBig className="text-green-500 mx-2" />,
                    error: <TriangleAlert className="text-red-500 mx-2"/>
                 }}
            />
        </SidebarProvider>
    )
}