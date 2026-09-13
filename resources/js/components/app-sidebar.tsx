import { Link } from "@inertiajs/react";
import { BookCopy, ChartCandlestick, LayoutDashboard, Phone, Users } from "lucide-react";
import type { NavItem } from "@/types/navigation";
import { useRoute } from "ziggy-js";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarFooter,  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";


const NavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Subject',
        href: '/subject',
        icon: BookCopy
    },
    {
        title: 'Grade',
        href: '/grade',
        icon: ChartCandlestick
    },
    {
        title: 'Student',
        href: '/student',
        icon: Users
    }
] as const;

export function AppSidebar() {
    const route = useRoute();

    return (
        <Sidebar collapsible="icon" className="group">
            <SidebarHeader>
                <SidebarMenu className="p-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <Link href={route("home")} className="flex items-center gap-2 font-semibold">
                                <img
                                    src="/logo.png"
                                    alt=""
                                    className="w-10 h-10 group-data-[collapsible=icon]:w-auto
                                    object-cover object-center"
                                />
                                <span
                                    className="group-data-[collapsible=icon]:hidden"
                                >My App</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={NavItems}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
