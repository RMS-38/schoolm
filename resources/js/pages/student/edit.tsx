import { setLayoutProps } from "@inertiajs/react";
import { StudentForm } from "@/components/student/student-form";
import Layout from "@/layouts/layout";
import NestedLayout from "@/layouts/nested-layout";
import type{ Grade } from "@/types/grade";
import type{ Student } from "@/types/student";


type StudentWithGrade = Student & {
    grade: Grade
}
export default function StudentEdit({ student }: { student: StudentWithGrade }) {
    setLayoutProps('student', {
        title: `${student.name} edit`,
        breadCrumb: [
            {title: 'Student', routeName: 'student.index'},
            {title: 'Show', routeName: 'student.show', params: student.id},
            {title: 'Edit', routeName: 'student.edit', params: student.id, currentPage:true}
        ]
    })

    return (
        <StudentForm student={student} />
    )
}

StudentEdit.layout = {
    Layout,
    student: NestedLayout
}