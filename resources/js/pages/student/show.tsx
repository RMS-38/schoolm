import { Head, Link, router, setLayoutProps, usePage } from "@inertiajs/react"
import { Pencil, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"
import { StudentAbout } from "@/components/student/student-about"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import GradeLayout from "@/layouts/grade-layout"
import Layout from "@/layouts/layout"
import type { Grade } from "@/types/grade"
import type{ Student } from "@/types/student"
import { useRoute } from "ziggy-js"

type StudentWithGrade = Student & {
    grade: Grade
}

interface Props{
    student: StudentWithGrade;
}

export default function StudentShow({ student }: Props) {
    const route = useRoute();
    const { flash } = usePage();

    if (flash.status) {
        toast.success(flash.status, { position: 'top-right' });
    }
    

    setLayoutProps('student', {
        title: student.name,
        breadCrumb: [
            {title: 'Student', routeName: 'student.index'},
            {title: 'Show', routeName: 'student.show', params: student.id, currentPage:true}
        ]
    })

    const handleDelete = () => {
        if (confirm(`Are you sure to delete ${student.name}`)) {
            router.delete(route('student.destroy', student.id));
        }
    }

    return (
        <>
            <Head title="student - show" />  
            <div
                className="flex gap-5 md:gap-8 p-4"
            >
                <div
                    className="ml-4 md:ml-9 h-15 w-15 rounded-full overflow-hidden"
                >
                    <img src={student.photo
                        ? `/storage/${student.photo}`
                        : '/storage/images/student/student-default.png'}
                        alt="user avatar"
                        className="w-full h-full object-cover object-center rounded-full"
                    />
                </div>

                <div
                    className="w-full flex items-center"
                >
                    <h1
                        className="text-xl md:text-3xl font-extrabold"
                    >
                        {student.name}
                    </h1>
                </div>
                 <div className="flex items-center gap-2">
                    <Link
                        href={route('student.edit', student.id)}
                    >
                        <Pencil />
                    </Link>
                    <Button
                        onClick={handleDelete}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
            <Separator />
            <StudentAbout student={student}/>
        </>
    )
}

StudentShow.layout = {
    Layout,
    student:GradeLayout
}