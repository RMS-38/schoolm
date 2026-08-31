import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import type { NavItem } from "@/types/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";


export const NavMain = ({ items = [] }: { items: NavItem[] }) => {
    const { url } = usePage();
    const { state } = useSidebar();

    return (
        <SidebarMenu data-collapsible={state} className="group px-2">
            {items.map((item) => {
                const currentPath = new URL(url, "http://localhost").pathname;
                const isActive = item.href === '/'
                    ? currentPath === '/'
                    : currentPath === item.href;

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            // asChild
                            isActive={isActive}
                            tooltip={item.title}
                            className="mx-2 group-data-[collapsible=expanded]:mx-auto"
                        >   
                            <Link href={item.href}
                                className={clsx(
                                    `flex w-full items-center  h-12 gap-2 transition-colors  
                                    group-data-[collapsible=collapsed]:justify-center
                                    group-data-[collapsible=collapsed]:gap-0
                                    dark:group-data-[collapsible=expanded]:bg-transparent
                                    rounded-xl`,
                                    isActive && "group-data-[collapsible=expanded]:bg-emerald-500"
                                )}
                            >
                                {item.icon && <div className={clsx(`p-2 pr-2.5 rounded-md 
                                    dark:group-data-[collapsible=collapsed]:bg-transparent`,
                                    isActive && "group-data-[collapsible=collapsed]:bg-emerald-500"
                                )}>
                                    <item.icon className="h-4 w-4" />
                                </div>}
                                <span className="text-sm font-medium group-data-[collapsible=collapsed]:hidden">
                                    {item.title}
                                </span>
                                </Link>
                            
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    )
} 