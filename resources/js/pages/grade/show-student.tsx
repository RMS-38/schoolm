import { setLayoutProps } from "@inertiajs/react";
import { StudentAbout } from "@/components/student/student-about";
import GradeLayout from "@/layouts/grade-layout";
import Layout from "@/layouts/layout";
import type{ Grade } from "@/types/grade";
import type{ Student } from "@/types/student";

type StudentWithGrade = Student & {
    grade: Grade;
}
export default function ShowStudent({ student }: { student: StudentWithGrade }) {
    setLayoutProps('grade', {
        title: `${student.grade.name}-${student.name}`,
        breadCrumb: [
            {title: 'Grade', routeName: 'grade.index'},
            {title: 'Show', routeName: 'grade.show', params: [student.grade.id]},
            {title: 'Student', routeName: 'grade.showStudent', params: [student.grade.id, student.id], currentPage: true}
        ]
    })
    
    return (
        <div>
            <StudentAbout student={student}/>
        </div>
    )
}

ShowStudent.layout = {
    Layout,
    grade: GradeLayout
}