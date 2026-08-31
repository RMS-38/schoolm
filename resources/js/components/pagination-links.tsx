import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Paginated } from "@/types/paginated"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./ui/pagination"
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";


export const PaginationLinks = <T,>({ objects }: { objects: Paginated<T> }) => {
    
     const makeLabel = (l: string) => {

        const label = l.toLowerCase();
        
        if (label.includes('prev')) {
            return <ChevronLeft className="w-5 h-5"/>
        } else if (label.includes('next')){
            return <ChevronRight className="w-5 h-5"/>
        } else {
            return label
        }
    }

    return (
        <div
            className="flex justify-between items-center m-3"
        >
            <Pagination className="mx-3 justify-start">
                <PaginationContent>
                    {objects.links.map((link,i) => <>
                        <PaginationItem key={i}
                            className="flex gap-1 items-center"
                        >
                            {link.url?<Link
                                href={link.url}
                                className={cn(`h-8 w-8 flex items-center rounded-sm justify-center
                                    hover:bg-emerald-500 dark:hover:bg-emerald-900 transition-colors duration-500`,
                                    { 'bg-emerald-500 dark:bg-emerald-900': link.active })}
                            >
                                {makeLabel(link.label)}
                            </Link> :
                                <span
                                    className="h-8 w-8 flex items-center justify-center"
                                >{makeLabel(link.label)}</span>}
                        </PaginationItem>
                    </>)}
                </PaginationContent>
            </Pagination>
            <p
                className="text-muted-foreground w-full text-center"
            >Showing {objects.from} to {objects.to} of {objects.total} results </p>
        </div>
    )
}