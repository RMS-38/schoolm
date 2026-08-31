import { useEffect, useState } from "react";
import type{ Theme } from "@/types";


export default function useTheme(){
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem('theme') as Theme) || 'system'
    );

    useEffect(() => {
        const root = document.documentElement;

        if (
            theme === 'dark' || (theme === 'system' && window.matchMedia(
                "(prefers-color-scheme:dark)"
            ).matches)
        ) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        if (theme === 'system') {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return {theme, setTheme}
}