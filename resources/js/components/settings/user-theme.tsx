import type{ Theme } from "@/types";
import { Card, CardAction, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import useTheme from "@/hooks/use-theme";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const UserTheme = ({ userTheme }: { userTheme: Theme }) => {
    const route = useRoute();
    const { theme, setTheme } = useTheme(userTheme);
    const changeTheme = (theme: Theme) => {
        setTheme(theme);
        router.patch(route('setting.theme', {theme: theme}))
    }

    return (
        <Card className="text-center items-center">
            <CardTitle
                className="text-2xl"
            >Theme</CardTitle>
            <CardAction
                className="flex items-center justify-center w-full"
            >
                <div className="mx-4 flex justify-center p-3 gap-3 border rounded-lg">
                    <Button
                        onClick={() => changeTheme('light')}
                        className={cn('text-black dark:text-white',{'bg-transparent':theme !=='light'})}
                    >
                        <Sun />
                        <span>Light</span>
                    </Button>
                    <Button
                        onClick={() => changeTheme('dark')}
                        className={cn('text-black dark:text-white',{'bg-transparent':theme !=='dark'})}
                    >
                        <Moon />
                        Dark
                    </Button>
                    <Button
                        onClick={() => changeTheme('system')}
                        className={cn('text-black dark:text-white',{'bg-transparent':theme !=='system'})}
                    >
                        <Monitor />
                        System
                    </Button>
                </div>
            </CardAction>
        </Card>
    )
}