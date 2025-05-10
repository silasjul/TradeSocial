"use client";

import * as React from "react";
import { ChartNoAxesColumn } from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeSwitch } from "./theme-switch";
import { Users, Settings2, House, ChartCandlestick } from "lucide-react";

const teams = [
    {
        name: "TradeSocial",
        logo: ChartNoAxesColumn,
    },
];

export type Pages = "Dashboard" | "Charts" | "People" | "Settings";

const navItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: House,
    },
    {
        title: "Charts",
        url: "/charts",
        icon: ChartCandlestick,
    },
    {
        title: "People",
        url: "/follow-people",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
    },
];

const user = {
    name: "Silas Kierstein",
    email: "silaskierstein@gmail.com",
};

export function AppSidebar({
    activepage,
    includeHeader,
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const updatedNavItems = navItems.map((item) => ({
        ...item,
        isActive: item.title === activepage, // Dynamically set isActive
    }));

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader>
                    <TeamSwitcher teams={teams} />
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={updatedNavItems} />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={user} />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                {includeHeader ||
                    (includeHeader == undefined && (
                        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 z-10">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                            </div>
                            <div className="ml-auto m-4">
                                <ThemeSwitch />
                            </div>
                        </header>
                    ))}
                {props.children}
            </SidebarInset>
        </SidebarProvider>
    );
}
