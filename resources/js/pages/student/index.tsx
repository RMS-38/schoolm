import { Head, Link,  usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { Search } from "@/components/search";
import { StudentList } from "@/components/student/student-list";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import NestedLayout from "@/layouts/nested-layout";
import type { PageProps } from "@/types/page-props";
import type { StudentsWithGrade } from "@/types/student";
import { useRoute } from "ziggy-js";


export default function StudentIndex({ students }:{students: StudentsWithGrade}) {
    const route = useRoute();
    const { flash } = usePage<PageProps>().props;

    
    if (flash?.status) {
        toast.success(flash.status, { position: 'top-right' })
    }
    
    return (
        <>
            <Head title="Students" />
            <div
                className="flex justify-between items-center w-auto gap-2"
            >
                <Search routeName="student.index"/>
                <Link
                    href={route('student.create')}
                >
                    <Button>Create</Button>
                </Link>
            </div>
            <StudentList students={students}/>
        </>
    )
}

StudentIndex.layout = [
    [Layout],
    [NestedLayout, {title: 'Students'}]
]