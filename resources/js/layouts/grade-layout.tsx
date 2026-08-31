
import { Head } from "@inertiajs/react";
import type { ReactNode } from "react";
import { BreadCrumb } from "@/components/bread-crumb";
import { Separator } from "@/components/ui/separator";
interface BreadCrumb{
    title: string;
    routeName: string;
    params?: number;
    currentPage?:boolean
}
interface Props{
    children: ReactNode;
    title: string;
    breadCrumb?: BreadCrumb[];
}
export default function GradeLayout({
    children, title, breadCrumb}:Props) {
    return (<>
        <Head title={title} />
        <h1 className="mx-10 mb-1 -mt-7.5 text-2xl">{title}</h1>
        <Separator/>
        <div
            className="mx-8 my-2"
        >
            {breadCrumb &&<BreadCrumb
                items={breadCrumb}
            />}
        </div>
        <div
            className="mx-5 p-2"
        >
            {children}
        </div>
        
    </>)
}