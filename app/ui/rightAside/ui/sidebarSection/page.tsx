import { cn } from "@/lib/utils";
import style from "./sidebarSection.module.css";
import { ReactNode } from "react";

interface SidebarSectionProps {
    title: string;
    icon?: ReactNode;
    children?: ReactNode;
}

export default function SidebarSection({ title, icon, children }: SidebarSectionProps) {
    return (
        <div className={cn(style.sidebarSection, style.glass)}>
            <div className={style.sectionHeader}>
                {icon}
                <h3 className={style.sectionTitle}>{title}</h3>
            </div>
            {children}
        </div>
    );
}