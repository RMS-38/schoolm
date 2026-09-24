import { router, useForm } from "@inertiajs/react"

import {  Search as SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { useRoute } from "ziggy-js";
import { Input } from "./ui/input";

export const Search = ({ routeName }: { routeName: string }) => {
    const route = useRoute();
    const { data, setData } = useForm<{ search: string }>({ search: '' });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            router.get(route(routeName, value ? { search: value } : {}),
                {},
                {
                    preserveState: true
                })
        }, 500);
    }

    useEffect(() => {
        if (timeoutRef.current) {
            return clearTimeout(timeoutRef.current)
        }
    }, []);
    
    return (
        <>
            <div className="relative md:w-xs">
                    <Input
                        className="pr-10"
                        name="search"
                        placeholder="Search"
                        type="search"
                        value={ data.search}
                        onChange={(e)=>search(e)}
                    />
                    <span className="absolute right-1 top-1 bottom-1">
                        <SearchIcon />
                    </span>
                </div>
        </>
    )
}