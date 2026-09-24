import { Head, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { PaginationLinks } from "@/components/pagination-links";
import { CreateSubjectDialog } from "@/components/subjects/create-subject-dialog";
import { SubjectTable } from "@/components/subjects/subject-table";
import type { PageProps } from "@/types/page-props";
import type { Subjects } from "@/types/subject";

export default function SubjectIndex({subjects}:{subjects: Subjects}) {
    const { flash } = usePage<PageProps>().props;
    
    if (flash?.status) {
        toast.success(flash.status, {position:'top-right'})
    }

    return (
        <>
            <Head title="Subjects" />
            <h1 className="mx-10 mb-4 -mt-7.5 text-2xl">Subjects</h1>
            <div
                className="flex justify-between items-center mx-3 mt-3"
            >
                <div>Search</div>
                <CreateSubjectDialog/>
            </div>
            <div className="m-3">
                <SubjectTable subjects={subjects.data} />
                <PaginationLinks objects= {subjects}/>
            </div>
        </>
    )
}